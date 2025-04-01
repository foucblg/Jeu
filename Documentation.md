# Gestion des utilisateurs

La question des utilisateurs est géré par un service qui se charge de stocker les différents utilisateurs présent, afin de leur attribuer des tâches.
Le service dispose des méthodes suivantes : addUser, getUsers, deleteUser, editUser, getUserByEmail, getUsersWithTask.
Ce service est donc utilisé à deux reprises, une première fois pour inscrire les utilisateurs à la réunion, et une seconde fois pour leur attribuer des tâches.

# Cartes diagnostic (inclusif-cards)

## Le stockage des données

Le fichier `navigation_data.json` contient une liste d'objets représentant des questions et des descriptions liées à l'inclusivité dans divers aspects d'un projet numérique. Chaque objet dans le tableau `data` représente une carte de diagnostic avec plusieurs propriétés.

### Structure des objets

Chaque objet dans le tableau `data` a les propriétés suivantes :

- **numero** (type: `integer`): Le numéro de la carte de diagnostic.
- **nom** (type: `string`): Le nom de la carte de diagnostic.
- **question** (type: `string`): La question posée pour évaluer un aspect spécifique de l'inclusivité.
- **description** (type: `string`): Une description détaillée expliquant l'importance de la question et fournissant des informations supplémentaires.
- **categorie** (type: `string`): La catégorie à laquelle appartient la carte de diagnostic.
- **imageurl** (type: `string`): L'URL de l'image associée à la carte de diagnostic.
- **textcolor** (type: `string`): La couleur du texte associée à la carte de diagnostic, spécifiée en code hexadécimal.

### Exemple d'objet

Voici un exemple d'un objet dans le tableau `data` :

```json
{
    "numero": 1,
    "nom": "Cadrage et Planification",
    "question": "L'inclusivité de votre service numérique est-il un objectif pour l'équipe ?",
    "description": "Au même titre que la qualité, le délai de mise en oeuvre ou le coût d'un service numérique, son inclusivité, c'est-à-dire sa capacité à être inclusif et accessible, peut être un objectif majeur intégré aux différentes phases d'un projet.",
    "categorie": "Gestion de projet",
    "imageurl": "images/Cartes_Diagnostic/cadrage-et-planification.png",
    "textcolor": "#ED6F3A"
}
```

## Variables

Les variables se reportant aux cartes diagnostic sont stockée dans le service "answer-storage.service.ts".
Il contient : 
answers: { [key: number]: boolean } => un dictionnaire contenant la réponse à chaque carte
etat_carte: {[key : number]: string} => un dictionnaire permettant de savoir si une carte a été répondue ou non
remainingTime et continue, 2 variables utilisées pour la gestion du timer
currentNumber at catSubject qui donnent l'id de la carte diagnostic affichée actuellement ainsi que sa catégorie.

## Structure des components de inclusif-cards

navigation-button : Ce composant est un bouton qui permet de naviguer entre les cartes diagnostic. Il met à jour currentNumber dans le service et transmet cet mise à jour aux autres composants.

theme-indicator : Ce composant constitue la barre de progression que l'on retrouve en haut de l'écran. Essentiellement du HTML et CSS, il récupère seulement l'id de la carte actuelle et change en fonction de celle-ci.

navigation-card : Ce composant gère chaque carte et ses boutons radio qui sont utilisés pour répondre "Oui" ou "Non" aux cartes. Chaque carte est initialisée avec le ngModel="Rien", qui va changer en fonction de la réponse mise dans la carte. L'affichage est également initialisée avec aucune sélection. La carte est également capable de se rappeler de sa sélection grâce au service qui retient si une carte a été répondue et la réponse que l'utilisateur avait donnée (géré par onCardChange(number)).

inclusif-cards : Composant parent des 3 composants précédent et qui permet leur assemblage. Les variables issues du service y sont transmises.

## Navigation dans les cartes diagnostic (et solution également)

On souhaite éviter de changer de path à chaque changement de carte, on a donc utilisé les queryparams afin de modifier l'url pour qu'il contienne l'id de la carte affiché, en vérifiant à l'initialisation que cet id corresponde au numéro de carte actuel on peut utiliser l'id pour naviguer.

# Cartes Solution

## Le stockage des données

Les données relatives au stockage de données sont stockées dans un JSON nommé awnsers_data.json sous la forme data:{[
    {
      "id": 16, // Ce numéro donne le numéro de la carte et est unique à chaque carte réponse
      "categorie": "Expérience utilisateur",
      "sous_categorie": "Décryptage et analyse",
      "titre": "Représentez vos utilisateurs",
      "contenu": [
        "Utilisez des outils tels que le persona pour représenter vos utilisateurs : vous pourrez ainsi concevoir autour de leurs objectifs. \n Un persona est un personnage fictif que l'on utilise afin de se représenter un groupe d'utilisateurs dans le but de mieux se mettre dans leur peau."
      ], // le contenu est une liste, dans le cas où ele contient plusieurs éléments, ceux-ci seront précédés d'un bullet point grâce à un test dans le HTML

      "source": {
        "nom": "Figma community (en anglais)",
        "description": "La communauté Figma recense de nombreux modèles de persona prêts à l'emploi."
      }, // Cela contient les informations relative à la source, ce n'est plus utilisé dans la version la plus récente du jeu


      "image": true, // Ce booléen dit si une image correspond à cette carte, les images sont nommées de façon normalisée solution_id.png
      "image_comparaison": false, // Plus utilisé
        "textcolor": "#24624C" // Contient  la couleur d'affichage de la catégorie
    }
]}


## Gestion de l'affichage

Cette partie du site a pour but de présenter des solutions correspondant aux problèmes soulevés lors des réponses données à la première partie, On reçoit une liste de booléens indiquant quelles réponses sont négatives et il suffit alors d'afficher les cartes solutions correspondantes. Pour ce faire, on trie sur les données présentes dans le JSON, l'id des false nous permet d'obtenir les nom correspondant aux cartes où la réponse a été négative. Un autre JSON existe contenant toutes les informations des cartes réponses, notamment un attribut "sous-catégorie" qui correspond au nom dans le JSON des questions, en cherchant les noms qui coïncident on obtiens alors les cartes solutions à afficher

## Assigner les tâches

Une fois les cartes solutions affichées, on peut choisir, ou non, d'assigner une ou plusieurs personnes à la tâche par le biais d'un menu déroulant avec une option de recherche dans le cas où de nombreuses personnes seraient inscrites à la séance de jeu.

Pour connaitre les personnes présentes dans la réunion, on importe alors le service "user-service" qui a été utilisé plus tôt afin d'inscrire les membre de la réunion. Dans ce même service, on utilise la classe task dont une itération est associé à chaque user afin d'enregistrer les tâches.

## Indicateur de thème

L'indicateur de théme a été réalisé dans le but de correspondre aux cartes questions qui sont nettement mois nombreuses que les cartes solution (environ 4 fois moins), afin de pouvoir le réutiliser on a donc fait le chemin inverse de l'affichage pour avoir l'id de la carte question correspondant à la sous-catégorie en cours de traitement, grâce à cela, l'indicateur de thème fonctionne aussi avec les cartes solutions.
