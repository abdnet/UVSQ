FROM ubuntu:latest
MAINTAINER idouhammou.a <idouhammou.a@gmail.com>

#mise à jour
RUN apt-get update && apt-get -y upgrade

#installation lamp

RUN apt-get -y install apache2 php7.0 php7.0-mysql libapache2-mod-php7.0 curl lynx-cur

#variable d'environement 

ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_LOG_DIR /var/log/apache2
ENV APACHE_LOCK_DIR /var/lock/apache2
ENV APACHE_PID_FILE /var/run/apache2.pid

#isnatllation git
RUN apt-get -y install git

RUN git clone -b apps https://github.com/abdnet/UVSQ.git
COPY UVSQ/index.php var/www/html
#Expose apache
EXPOSE 80

ADD apache-config.conf /etc/apache2/sites-enabled/000-default.conf

CMD /usr/sbin/apache2ctl -D FOREGROUND



