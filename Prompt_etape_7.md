# Prompt --- Génération complète du jeu Tours de Hanoï (Étapes 1 à 7)

##  Objectif général

Génère pour moi **l'intégralité du jeu des Tours de Hanoï**, en **HTML,
CSS et JavaScript pur**, incluant **toutes les fonctionnalités des
étapes 1 à 7**.

Je veux une application web complète, moderne, interactive, esthétique
et fonctionnelle.

Le code doit être organisé en trois fichiers distincts :

-   `index.html`
-   `style.css`
-   `script.js`

------------------------------------------------------------------------

##  Étape 1 --- Structure de base

Crée une page web contenant :

-   une zone affichant **3 tours** (3 piliers visibles),
-   un champ permettant de choisir le nombre d'anneaux
    (`input type="number"`),
-   un bouton **Démarrer**,
-   un premier affichage simple, propre et centré.

Pas d'interaction à cette étape.

------------------------------------------------------------------------

##  Étape 2 --- Génération dynamique des anneaux

Quand je clique sur **Démarrer** :

-   récupérer le nombre d'anneaux indiqué par l'utilisateur,
-   vider la première tour,
-   générer automatiquement les anneaux,
-   les empiler du **plus grand (en bas)** au **plus petit (en haut)**,
-   chaque anneau doit avoir une largeur différente.

Les anneaux doivent être dans un conteneur dédié :

``` html
<div class="disk-container"></div>
```

------------------------------------------------------------------------

##  Étape 3 --- Déplacement manuel des anneaux

Ajouter :

-   la possibilité de cliquer sur un anneau pour le **sélectionner**,

-   puis cliquer sur une tour pour le **déposer**,

-   tout en respectant la règle du jeu :

    ➜ **on ne peut poser un anneau que sur un plus grand ou sur une tour
    vide**,

-   un effet visuel sur l'anneau sélectionné,

-   déplacement réel dans le DOM dans `.disk-container`.

------------------------------------------------------------------------

##  Étape 4 --- Améliorations visuelles

Rendre le jeu plus agréable visuellement :

-   couleurs modernes,
-   ombres douces,
-   mise en page améliorée,
-   transitions fluides,
-   anneaux plus esthétiques,
-   survol des tours et des anneaux,
-   effet clair sur l'anneau sélectionné,
-   thème harmonieux, équilibré et moderne.

------------------------------------------------------------------------

##  Étape 5 --- Démo automatique

Ajouter un bouton **Démo automatique**.

Lorsqu'on clique dessus :

-   le jeu doit se résoudre **automatiquement et visuellement**,

-   en utilisant l'algorithme récursif classique :

        hanoi(n, from, to, aux)

-   les déplacements doivent être animés, un par un,

-   délai entre chaque mouvement (300--600 ms),

-   réutiliser la même logique que l'étape 3 pour déplacer les anneaux,

-   désactiver les clics du joueur pendant la démo.

------------------------------------------------------------------------

##  Étape 6 --- Extensions obligatoires

Ajouter les fonctionnalités suivantes :

###  Compteur de coups

-   incrémenter à chaque déplacement manuel ou automatique,
-   affichage visible et propre.

###  Détection de victoire

-   déclencher un message de félicitations lorsque tous les anneaux sont
    sur la tour 3.

###  Système de score

calculer : - coups effectués, - coups minimum (`2^n - 1`), - évaluation
du joueur (ex : *Excellent*, *Moyen*, *À améliorer*).

###  Bouton Reset

-   réinitialiser complètement la partie,
-   remettre les anneaux dans la tour 1,
-   remettre le compteur à 0.

###  Animations avancées

-   glissement fluide lors des déplacements,
-   transitions visibles et agréables.

###  Mode sombre / clair

-   bouton bascule « Mode sombre / clair »,
-   thème sombre complet (texte, fond, tours, anneaux),
-   transitions douces entre les deux thèmes.

------------------------------------------------------------------------

##  Étape 7 --- Finalisation

Le code final doit être :

-   complet,
-   propre,
-   structuré,
-   lisible,
-   fonctionnel dans un simple navigateur,
-   séparé en trois fichiers : **HTML, CSS, JS**,
-   sans dépendances externes,
-   documenté avec commentaires clairs,
-   prêt à être livré dans un dossier de TP.

------------------------------------------------------------------------

##  Rendu attendu

Donne-moi maintenant :

-   `index.html`
-   `style.css`
-   `script.js`

Le tout **complet**, **fonctionnel**, **optimisé** et intégrant **toutes
les fonctionnalités des étapes 1 à 7**.
