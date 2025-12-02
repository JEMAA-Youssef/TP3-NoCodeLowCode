# Prompt Étape 6 --- Extensions Obligatoires (Tours de Hanoï)

Ajoute l'Étape 6 de mon projet **Tours de Hanoï**.\
Je veux intégrer toutes les fonctionnalités obligatoires suivantes :

------------------------------------------------------------------------

## 1. Compteur de coups

-   Incrémenter le compteur à chaque déplacement **manuel**.
-   Incrémenter également pendant la **démo automatique**.
-   Afficher le compteur dans l'interface.

------------------------------------------------------------------------

##  2. Détection de victoire

-   Détecter lorsque tous les anneaux sont dans la **troisième tour**.
-   Afficher un message de victoire (popup ou message visuel).
-   Bloquer les interactions ou proposer un reset.

------------------------------------------------------------------------

##  3. Système de score basé sur le minimum

-   Calculer le score minimal : `2^n – 1`.
-   Afficher :
    -   nombre de coups effectués,
    -   coups minimum,
    -   une évaluation (ex : "Excellent", "Bien", "À améliorer").

------------------------------------------------------------------------

##  4. Bouton Reset

-   Ajouter un bouton **« Reset »** dans l'interface.
-   Il doit :
    -   réinitialiser le jeu,
    -   remettre tous les anneaux dans la tour 1,
    -   vider et réinitialiser le compteur.

------------------------------------------------------------------------

##  5. Animations avancées

-   Ajouter un **glissement fluide** des anneaux lors des déplacements.
-   Animation en CSS ou JS (`transition`, `transform`).
-   Rendre les déplacements visuellement plus propres.

------------------------------------------------------------------------

##  6. Mode sombre / clair

-   Ajouter un bouton pour alterner entre :
    -   **Mode clair**
    -   **Mode sombre**
-   Adapter :
    -   le fond,
    -   les textes,
    -   les tours,
    -   les boutons,
    -   les anneaux.

------------------------------------------------------------------------

##  Travail demandé

Donne-moi :

1.  Les modifications **HTML** nécessaires (boutons : Reset, Mode
    sombre/clair, zone compteur, zone score).
2.  Le **CSS complet**, incluant :
    -   animations, transitions,
    -   thème clair,
    -   thème sombre.
3.  Le **JavaScript complet** pour :
    -   compteur,
    -   détection de victoire,
    -   score,
    -   reset du jeu,
    -   changement thème clair/sombre,
    -   compatibilité avec les étapes 1 à 5.

------------------------------------------------------------------------

##  Restrictions

-   Ne pas réécrire les étapes précédentes.
-   Ne pas casser la logique de déplacement manuel (Étape 3).
-   Ne pas remplacer le mode automatique (Étape 5).
-   Ne pas modifier la structure principale du jeu.
