var express = require('express'),
    bodyP = require('body-parser'),
    twig = require('twig'),
    md5 = require('md5'),
    session = require('express-session'),
    randomstring = require("randomstring"),
    path = require('path'),
    mysql = require('mysql');


var app = express();
//configuration//////////////////////////////////////////////////////////:
app.use(bodyP.urlencoded({ extended: true }));
app.use(session( {
  secret : '12345',
  resave: false,
  saveUninitialized: false,
  }));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(bodyP.json()); // for parsing application/json


var db    = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'doodle'
});
    
var session={logged:false};

app.get('/userlist', function(req, res) {
    db.query("SELECT * FROM user", function (err, rows) {
        if (err) {
            console.log(err);
            res.status(500).send('SQL Error');
        } else {
            res.render('userliste.twig', { 'users' : rows});
        }
    });
});



// On configure le dossier contenant les templates
// et les options de Twig
app
    .set('views', 'templates')
    .set('twig options', { autoescape: true });

// On définit une route pour l'url /
app.get('/authentification', function(req, res) {
    if( session.logged){
    res.redirect('/');

    }else
    res.render('auth.twig') ;
});
///////////////////////////////////////////////////////////////////////
app.get('/', function(req, res) {
    if(!session.logged){
      res.redirect('/authentification');
    }else
    res.render('index.twig',{para:session});
});

app.get('/eventlist',function(req,res){
   if(!session.logged){
      res.redirect('/authentification');
    }else{
          db.query('select a.id,a.date_creation,a.pre_jour,a.last_jour,u.nom,a.description,a.titre from agenda as a,user as u where a.id_user=u.id order by a.date_creation desc' , function(error,results){
              if (error) throw Error;
              else{
            res.render('event_liste.twig',{para:session,rows:results});
              }
          });    

  }
});


app.get('/logout' , function(req,res){
      session={logged:false};
      res.redirect('/authentification');
});

app.get('/preferences', function(req, res) {
    if(!session.logged){
      res.redirect('/authentification');
    }else{
   var query= db.query('select v.id,v.date_choix,a.titre,a.description from vote as v, agenda as a  where v.idUser=? and v.idAgenda=a.id  and v.annuler=0  order by v.date_choix desc',session.user,function(error,results){
      console.log(query.sql);
      if (error) throw error;
      else{
        res.render('prefer_liste.twig',{para:session,rows:results});
      }
    });
 }
});

app.get('/:n', function(req, res) {
    res.render('404.twig', { nom : req.params.n })
});
//Gestionnaire 
app.post('/delete_agenda' , function(req,res){
      var id = parseInt(req.body.tr);
      db.query("delete from agenda where id=?",id,function(error,results){
        if(error) {
          throw error;
          res.send('2');}
        else{
          res.send('1');  
        }
      }); 

});


app.post('/signup', function(req, res) {
        var  nom = req.body.nom;
        var  prenom = req.body.prenom;
        var couleur = req.body.couleur;
        var descrypt = md5(randomstring.generate(12));
        var  password = md5(md5(descrypt)+req.body.password1+md5(descrypt));
        var email = req.body.email;
        var query1 = db.query('select * from user where email=? or color=?',[email,couleur],function(error,results){
          if(error) throw error;
          else{
            if(results.length == 0){
                var data ={id:null,nom:nom,prenom:prenom,color:couleur,email:email,password:password,cle:descrypt};    
                var query= db.query("insert into user set ?",data, function (error, results) {
                  if (error) throw error;
                  else  {
                    res.render('auth.twig',{message : 'ok !!',type:"2"});
                  }
                  
                });
            console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
  }else{
          res.render('auth.twig',{message : "couleur ou Email déja utilisé !!",data:req.body,type:"1"});
  }
}
  });
    
});

app.post('/add_event', function(req,res){
  var titre = req.body.titre;
  var debut = req.body.debut;
  var fin = req.body.fin;
  var desc = req.body.desc;
  var user =session.user;
  var d = ((new Date()).toISOString()).split('T');
  
  
  var data={id:null,id_user:user,date_creation:d[0],pre_jour:debut,last_jour:fin,titre:titre,description:desc};

  var query = db.query(" insert into agenda set ?", data, function(error,results){
      console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
     
      if(error) throw error;
      else{
            res.redirect('/eventlist');
        }
  });

});



app.post('/upload_agenda' , function(rep,res){
    var date  = new Date();
    var query1= db.query('select * from agenda where pre_jour<=? and last_jour>=?',[date,date], function(error,results){
      if(error) throw error;
      else{
        if(results.length>0){
        var agenda = results;
        var id_agenda = agenda[0];
        var query2 = db.query('select v.date_choix,u.id as user,u.nom,u.prenom,v.id as vote ,u.color from user as u ,agenda as a, vote as v where idAgenda=? and a.id=v.idAgenda and v.idUser=u.id and annuler=0', id_agenda['id'], function(error,results){
                if(error) throw error;
                else{
                  //console.log(results);
                  results.unshift(agenda);
                 // console.log(results.length);

                  res.send(results);
                }
          console.log(query2.sql);

        });
      }
    }
    });

    console.log(query1.sql);


});


app.post('/connexion' , function(req,res){
var email = req.body.email;
var password = req.body.password;
// var salt = req.body.salt;
//verifier si l'utilisateur est bien enregistré sur la bdd
var query = db.query('select cle, id from user where email =?',email,function(error,results){
      if ( error) throw error;//pas d'erreur SQL
      else{
        //si oui 
        if( results.length>0){
          //cryptage de mot de passe
            //console.log(results);
          var pwd = md5(md5(results[0]['cle'])+password+md5(results[0]['cle']) );
          //verification de mot de passe s'il est correcte
          var query = db.query('select * from user where id=? and password=?',[results[0]['id'],pwd],function(error,results){
                  if(error )throw error;
                  else{
                    if(results.length>0){
                        req.session.user = results[0]['id'];
                        req.session.logged = true;
                        req.session.name = results[0]['nom'];
                        req.session.color  = results[0]['color'];
                        req.session.statut = results[0]['statut'];
                        session = req.session;

                         res.redirect('/');
                      }else{
                      console.log("verification de mot de passe");
                       res.redirect('/authentification');
                    }
                  }
          }); 
        }else{
                      console.log("verification d'email"); 

          res.redirect('/authentification');
        }
      } 
});


      console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'

});

app.post('/delete_vote', function(req, res) {
    console.log('message --> serveur debut');
   var id_vote = req.body.id;
   
   var query = db.query('update vote set annuler=1 where id=?',id_vote,function(error,results){
        if(error) throw error;
        else{
          res.send('ok');
        }
   });
      console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'

});

app.post('/add_vote', function(req, res) {
    var date  = new Date();
    var user = session.user;
    var idAgenda = req.body.agenda;
    var choix = req.body.str;
    var sdata=[];
    var query1 =db.query('select * from vote where idAgenda=? and idUser=? and date_choix=? and annuler=0',[idAgenda,user,choix],function(error,results){
      if(error) throw error;
      else{
            if(results.length==0){
              var data  = {id:null,idUser:user,idAgenda:idAgenda,date_vote:date,date_choix:choix,annuler:0};
              var query2 = db.query('insert into vote set ?',data,function(error,results){
              if (error) throw error;
              else{

                    sdata.push("add");
                    sdata.push(session.user);
                  console.log("données sever --> "+sdata);

                    res.send(sdata);

                    
                  }
              });
                  console.log(query2.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
            }else{

                    sdata.push("notadd");
                    sdata.push(session.user);
                  console.log("données sever --> "+sdata);

                    res.send(sdata);


            }

      }
                  console.log(query1.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'

    });
   


});




// Maintenant on démontre l'utilisation des templates Twig
// On définit une route qui répond à tout url de la forme /blabla
// en répondant Hello blabla


// On lance l'application
// (process.env.PORT est un paramètre fourni par Cloud9)
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});