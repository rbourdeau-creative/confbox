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
- Ruby
- ruby-sass (gem install sass ou installer le paquet ruby-sass depuis votre dépôt)


## vhost

Sur Unix, éditer le fichier /etc/hosts en ajoutant une ligne avec le dns :

```
127.0.1.1	confbox.test
```

faites un ping au cas où sur ce dns afin de vérifier que vous récupérez bien des paquets. Ensuite, éditer un fichier dans /etc/apache2/sites-available. Nomez le comme le dns nouvellement créé avec une extension complémentaire .conf (confbox.test.conf). Placez y le code ci-dessous :

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

Aussi, n'oubliez pas de recharger Apache afin qu'il prenne en compte votre configuration :

```
sudo a2ensite confbox.test.conf && sudo systemctl reload apache2
```


## vhost windows

Modifier le fichier C:\wamp64\bin\apache\apache2.4.23\conf\extra\httpd-vhosts.conf comme ci-dessous

```
<VirtualHost *:80>
	#Nom de domaine
	ServerName confbox.test
	#On accepte aussi le www
	ServerAlias www.confbox.test
	#Log d'erreur
	ErrorLog C:/confbox/var/log/error.log
	#logs de connexion
	CustomLog C:/confbox/var/log/access.log common
	#Racine des sources
	DocumentRoot "C:/confbox/public/"

	<Directory  "C:/confbox/public/">
		Options +Indexes +Includes +FollowSymLinks +MultiViews
		AllowOverride All
		Require all granted
	</Directory>

</VirtualHost>
```

Dans le fichier C:\wamp64\bin\apache\apache2.4.23\conf\httpd.conf

Chercher la balise Directory et la modifier comme ci-dessous, si ce n'est pas déjà le cas

```
<Directory />
    AllowOverride All
    Require all granted
</Directory>
```

Ajouter le nom de l'hôte dans le fichier C:\Windows\System32\drivers\etc\hosts

```
127.0.0.1	confbox.test
::1	confbox.test
```

** note ** : Une fois que tout est installé. Vous pouvez avoir un petit message d'erreur :

> file_put_contents(/var/www/confbox/var/cache/config/development.json): failed to open stream: Permission denied in

Changer les droits sur ce dossier et d'une manière récursive

```
chmod -Rf var
```
