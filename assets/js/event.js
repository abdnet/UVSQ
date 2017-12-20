$("#vote").mouseover(function() {
    $(this).children(".description").show();
}).mouseout(function() {
    $(this).children(".description").hide();
});

$(document).ready(function() {
    var activeSystemClass = $('.list-group-item.active');

    //something is entered in search form
    $('#system-search').keyup( function() {
       var that = this;
        // affect all table rows on in systems table
        var tableBody = $('.table-hover tbody');
        var tableRowsClass = $('.table-hover tbody tr');
        $('.search-sf').remove();
        tableRowsClass.each( function(i, val) {
        
            //Lower text for case insensitive
            var rowText = $(val).text().toLowerCase();
            var inputText = $(that).val().toLowerCase();
            if(inputText != '')
            {
                $('.search-query-sf').remove();
                tableBody.prepend('<tr class="search-query-sf"><td colspan="6"><strong> Requête: "'
                    + $(that).val()
                    + '"</strong></td></tr>');
            }
            else
            {
                $('.search-query-sf').remove();
            }

            if( rowText.indexOf( inputText ) == -1 )
            {
                //hide rows
                tableRowsClass.eq(i).hide();
                
            }
            else
            {
                $('.search-sf').remove();
                tableRowsClass.eq(i).show();
            }
        });
        //all tr elements are hidden
        if(tableRowsClass.children(':visible').length == 0)
        {
            tableBody.append('<tr class="search-sf"><td class="alert alert-warning" role="alert" colspan="6">Ops! .. J\'ai rien trouvé :( !!  </td></tr>');
        }
    });
});

function upload_vote(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST" , "/upload_agenda");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send();
    xhr.onreadystatechange = function(){
                if(xhr.readyState==4 && xhr.status==200){
                        resultat = JSON.parse(xhr.responseText);
                        agenda_info = resultat[0][0];
                        add_head(date_format(agenda_info['pre_jour']),date_format(agenda_info['last_jour']),resultat);
                        /*for(j = 0 ;j<children.length;j++){
                            children[j].append('<span id="vote"><img src="/img/vote.png"></span>');
                        
                        }*/
                        
    }}
}
function add_head(debut,fin,vote){
    $('.tete').append('<p> Semaine du <b>'+addDays(debut,1) +' </b>au <b>'+addDays(fin,1)+'</b>');
    j=0;
    while(fin>=debut){
    var cpt = 0;
    $('#head').append("<th  data-date='"+addDays(debut,1)+"''>"+addDays(debut,1)+"</ht>");
    var td = document.createElement('td');
    td.setAttribute('align','left');
    td.setAttribute('data-date',addDays(debut,1));
    td.setAttribute('data-agenda',vote[0][0]['id']);
    td.setAttribute('onclick','add_event(event)');
    for(i =1;i<vote.length;i++){
        if( td.getAttribute('data-date') == addDays(date_format(vote[i]['date_choix']),1)){
            cpt++;
            var span = document.createElement('span');
            var img = document.createElement('img');
            span.setAttribute('id','vote');
            span.setAttribute('style','background-color:'+vote[i]['color']);
            span.setAttribute('data-date',date_format(vote[i]['date_choix']));
            span.setAttribute('data-vote',vote[i]['vote']);
            span.setAttribute('data-user',vote[i]['user']);
            span.setAttribute('title',vote[i]['nom']+' '+vote[i]['prenom']);
            img.setAttribute('src','/img/vote.png');
            span.append(img);
            td.append(span);
        }
    }

    $('#vote_zone').append(td);
    var th = document.createElement('th');
    th.append(cpt);
    $('#foot').append(th);
    debut = addDays(debut,1);
    j++;

}
}
function formattedDate(d) {
  let month = String(d.getMonth() + 1);
  let day = String(d.getDate());
  const year = String(d.getFullYear());

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return `${year}-${month}-${day}`;
}


function addDays(date,i) {
var date = new Date(date),
d = date.getDate(),
m = date.getMonth(),
y = date.getFullYear();

return formattedDate(new Date(y, m, d+i));

}
function event_delete(str){
    //pour recuperer l'id de l'event :: DOM 
	var tr = {tr :str.target.parentNode.parentNode.getAttribute('id')};
    //creation d'une requete xmlhttprequest
	var xhr = new XMLHttpRequest();
    // confimation de la supprission
    if (confirm("Voulez vous vraiment supprimer ?") == true) {
        // appel de gestionnaire /xxx d'une facon asynchrone
        xhr.open("POST", "/delete_agenda");
        //rajouter une entete a la requete http
       xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
       //l'envoie des données ( au server) sous forme Json
		xhr.send(JSON.stringify(tr));
        xhr.onload = function(event) {
            if(xhr.status ==200) //arrivée au serveur & traitée avec succès
                {
                    //verif suppression dans bd
                    if(xhr.responseText == 1){
    					location.reload();
                    }
                }
            else{ 

            }

        }; 
    }
    
    
}

function date_format(str){
 
    str= str.split('T');
    return str[0];
}




var clic = 0;
function add_event(event){

var choix=event.target.getAttribute('data-date');
var agenda=event.target.getAttribute('data-agenda');
var xhr = new XMLHttpRequest();
xhr.open("POST" , "/add_vote");
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhr.send(JSON.stringify({str : choix,agenda:agenda}));
    xhr.onreadystatechange = function(){
                if(xhr.readyState==4 && xhr.status==200){
                    clic++;
                    resultat = JSON.parse(xhr.responseText);
                    console.log(resultat[0]);

                    if(resultat[0]=="add"){
                             setTimeout(function() {
                                 location.reload(); 
                                }, 200);                     
                }else{
                                vote_enable(event,resultat[1]);


                            if(clic>1){

                                delete_event(event,resultat[1]);
                            }
                            }
                            
                     }

    }




}

function vote_enable(event,data){
    var child =event.target.children;
    var color;
    for( i =0;i<child.length;i++){
        if(child[i].getAttribute('data-user')!=data){

            color =child[i].getAttribute('style');
            child[i].setAttribute('style','background-color:red');
        }
    }
    return color;
}

function annuler_vote(event){
        var id = event.target.getAttribute('data-id');
        var tr = event.target.parentNode.parentNode;
        var xhr = new XMLHttpRequest();
        xhr.open("POST","/delete_vote");
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhr.send(JSON.stringify({id: id}));

    xhr.onreadystatechange = function(){
        if(xhr.status==200){

                if(xhr.responseText == "ok"){
                    $(tr).slideUp();
                    

                    }
                else{
                    location.reload();
                }
    }
}


}

function delete_event(event,data){
console.log('debug--> delete_event()' +clic);
var child =event.target.children;
var xhr = new XMLHttpRequest();
var vote_id;
var indice;
xhr.open("POST","/delete_vote");
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
for( i =0;i<child.length;i++){
        if(child[i].getAttribute('data-user')==data){
            vote_id = child[i].getAttribute('data-vote');
            indice=i;
            clic=0;
        }
    }
xhr.send(JSON.stringify({id: vote_id}));
        console.log('debug--> delete_event()--> send data');

xhr.onreadystatechange = function(){
    if(xhr.readyState==4 && xhr.status==200){

        if(xhr.responseText == "ok"){
        $(child[indice]).slideUp();
        setTimeout(function() {
        location.reload(); 
            }, 2000);

        }
        else{
            clic=0;
            location.reload();
        }
    }
}


}
/*

function my_vote(event){
        var index=vote_info(event.target.parentNode.children,event.target);
        event.target.parentNode.children[index].style.backgroundColor='red';
        console.log(event.target.parentNode.children[index].getAttribute('data-user'));
}

function vote_info(x,y) {
  
var arr = new Array();

for (i=0;i<x.length;i++)
{
  if (x.item(i).nodeType==1)
  {
    arr.push(x.item(i));
  }
}
return arr.indexOf(y);
}
*/