
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

## Navigation dans les cartes solution

On souhaite éviter de changer de path à chaque changement de carte, on a donc utilisé les queryparams afin de modifier l'url pour qu'il contienne l'id de la carte affiché, en vérifiant à l'initialisation que cet id corresponde au numéro de carte actuel on peut utiliser l'id pour naviguer.

## Indicateur de thème

L'indicateur de théme a été réalisé dans le but de correspondre aux cartes questions qui sont nettement mois nombreuses que les cartes solution (environ 4 fois moins), afin de pouvoir le réutiliser on a donc fait le chemin inverse de l'affichage pour avoir l'id de la carte question correspondant à la sous-catégorie en cours de traitement, grâce à cela, l'indicateur de thème fonctionne aussi avec les cartes solutions.
