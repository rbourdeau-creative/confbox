# confbox

## config

### server

- ubuntu 16.04
- apache 2.4.18
- php : 7.2.5
- sqlite : 3
- composer :1.0

### Front

- Gruntjs
- node 10.0
- npm 5.6


## vhost

Sur Unix, éditer le fichier /etc/hosts en ajoutant une ligne avec le dns :

```
127.0.1.1	confbox.test
```

faites un ping au cas où sur ce dns afin de vérifier que vous récupérez bien des paquets. Ensuite, editer un fichier dans /etc/apache2/sites-available. Nomez le comme le dns nouvellement créé avec une extension complémentaire .conf (confbox.test.conf). Placez y le code ci-dessous :

```
<VirtualHost *:80>
    #nom de domaine
	ServerName confbox.test
    #on accepte aussi le www
	ServerAlias www.confbox.test
    #logs d'erreur
	ErrorLog /var/www/confbox/var/log/error.log
    #logs de connexion
	CustomLog /var/www/confbox/var/log/access.log common
    #Définition de la racine des sources php
	DocumentRoot "/var/www/confbox/public/"
	<directory /var/www/confbox/public/>
		Options -Indexes +FollowSymLinks +MultiViews
		AllowOverride All
		#Order, allow, deny
		#Allow from all
		Require all granted
	</Directory>
</VirtualHost>
```

Pour CustomLog, ErrorLog, DocumentRoot et directory, paramétrez les bons chemins suivant votre configuration.
