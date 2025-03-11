# Documentation navigation_data.json

Le fichier `navigation_data.json` contient une liste d'objets représentant des questions et des descriptions liées à l'inclusivité dans divers aspects d'un projet numérique. Chaque objet dans le tableau `data` représente une carte de diagnostic avec plusieurs propriétés.

## Structure des objets

Chaque objet dans le tableau `data` a les propriétés suivantes :

- **numero** (type: `integer`): Le numéro de la carte de diagnostic.
- **nom** (type: `string`): Le nom de la carte de diagnostic.
- **question** (type: `string`): La question posée pour évaluer un aspect spécifique de l'inclusivité.
- **description** (type: `string`): Une description détaillée expliquant l'importance de la question et fournissant des informations supplémentaires.
- **categorie** (type: `string`): La catégorie à laquelle appartient la carte de diagnostic.
- **imageurl** (type: `string`): L'URL de l'image associée à la carte de diagnostic.
- **textcolor** (type: `string`): La couleur du texte associée à la carte de diagnostic, spécifiée en code hexadécimal.

## Exemple d'objet

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