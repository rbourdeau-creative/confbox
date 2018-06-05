## Création d'un compte

L'accès à l'écran de création d'un compte se fait directement sur la Home Page, en cliquant sur le bouton "Créer un compte".
A l'ouverture, tous les champs de saisies sont vide.
Le bouton radio "type de compte" est par défaut sur Participant.
Le bouton-radio "Civilité" est par défaut sur "Madame"
Le curseur est positionné dans zone Nom.

#### Description

Champs obligatoire : Type de compte, Civilité, Nom, Prénom, email, mot de passe, confirmation mot de passe.
Champ non obligatoire : Profession, Société, Téléphone.

Bouton "S'inscrire" : Validation des contrôles sur les champs, enregistrement du nouveau compte et fermeture de la fenêtre

Croix de fermeture : en haut à droite : Ferme la fenêtre sans enregistrer.

#### Règles de Gestion :

Type de compte : Présentateur ou Participant, radio-bouton obligatoire; participant par défaut.

Civilité : Radio-bouton, obligatoire, par défaut sur "Madame"

Nom, Prénom, Profession, Société : Champs de type texte, maxi 50 caractères, respect de la casse

Champ Téléphone : Champ de type alphanumérique, sans masque de saisie.

email : champ de type alphanumérique, contrôle sur la présence d'un '@'et au moins d'un '.'. L'email doit être unique.

Mot de Passe et Confirmation mot de passe : Champ de type alphanumérique, Vérification d'au moins 8 caractères, avec au moins une majuscule, un chiffre et un caractère spécial.

Règle d'unicité stricte entre l'email et le mot de passe : c'est le couple email/mot de passe qui définit un compte (sera à renseigner sur la popin d'identification).

Note : La ré-initialisation du mot de passe se fait sur la popin d'identification (cf SFD popin identification).

Bouton s'inscrire :

Permet de Vérifier que l'ensemble du formulaire est ok, d'enregistrer le compte, puis ferme la fenêtre et ouverture de la home du compte.
Au click sur le bouton, le formulaire est soumis pour validation des contrôles de format des champs.

**Si les contrôles sont NOK**, les erreurs sont explicitement signalées en rouge sous le/les champs en erreur.
Une fois toutes les erreurs corrigées, le formulaire est enregistré.

**Si contrôles OK**, le compte est crée, la popin de création de compte est fermée et la home de l'utilisateur est ouverte. l'utilisateur est connecté à l'application avec son compte, sa fenêtre home s'affiche. En fonction du profil, il existe 2 fenêtres de type home. Si l'utilisateur est un Présentateur, la fenêtre home du présentateur s'affiche, si l'utilisateur est un participant, la fenêtre home du participant s'affiche.


La croix en haut à droite permet de fermer la fenêtre sans vérifier et sans enregistrer les données déjà saisies du formulaire.
