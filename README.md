# Gestion de données et services dans le Cloud
> M2 dataScale - 2017/2018

[![Docker][Docker-image]][Docker-url]

Composition de services Cloud SaaS, PaaS, et IaaS
![](https://scontent-cdg2-1.xx.fbcdn.net/v/t34.0-0/p280x280/25675440_158228021613592_420563558_n.png?oh=8eb315a8b276892b2b54050fc3d5da86&oe=5A416C4E)

## Prérequis
- Installation de Docker :  
Pour l’installation de Docker sur une machine Ubuntu
https://github.com/abdnet/script/blob/master/installDockerUbuntu.sh

```sh
git clone https://github.com/abdnet/script.git
```
```sh
cd script

chmod +x installDockerUbuntu.sh

./installDockerUbuntu.sh

```

## TP 1 : Dockerfile && service cloud
* Creation d'une simple image basée sur Ubuntu 
  * Ligne de commande
    ```sh
    sudo docker pull ubuntu:latest
    ```
  * Dockerfile : 
    ```sh
    touch Dockerfile #Attention il faut respecter les minuscules et majuscules
    vim Dockerfile # editer le fichier avec vim ou un autre editeur 
    ------------
    FROM ubuntu:latest
    MAINTAINER idouhammou.a <idouhammou.a@gmail.com>
    -------------
    ```
    Pour créer l'image
    ```sh
    sudo docker build -t azayku/ubuntu:latest .
    # n’oublier pas l’espace suivi d’un point à la fin de votre ligne      de commande
    # à la place de azayku, utiliser votre nom d’utilisateur (dockerhub)

