// Variable globale pour stocker l'anneau sélectionné
let selectedDisk = null;

// Variables pour la démo automatique (Étape 5)
let demoInProgress = false;
const DEMO_DELAY = 400; // Délai en ms entre chaque mouvement

// Variables pour l'Étape 6
let moveCounter = 0;
let diskCount = 3;
let gameActive = true;

// Fonction appelée au démarrage du jeu
function startGame() {
    const diskCountInput = parseInt(document.getElementById('diskCount').value);
    diskCount = diskCountInput;
    console.log('Jeu démarré avec ' + diskCount + ' anneaux');
    
    // Réinitialiser l'état du jeu (Étape 6)
    selectedDisk = null;
    moveCounter = 0;
    gameActive = true;
    updateMoveCounter();
    updateMinMoves();
    updatePerformance();
    
    // Étape 2 : Générer les anneaux
    generateDisks(diskCount);
    
    // Étape 3 : Ajouter les écouteurs d'interaction
    initializeInteractions();
}

// Fonction pour générer les anneaux dans la première tour
function generateDisks(diskCount) {
    // Réinitialiser toutes les tours
    document.querySelectorAll('.tower-pole').forEach(tower => {
        tower.innerHTML = '';
    });
    
    // Créer et empiler les anneaux sur la première tour (du plus grand au plus petit)
    const tower1 = document.querySelector('.tower-pole');
    
    for (let i = diskCount; i >= 1; i--) {
        const disk = document.createElement('div');
        disk.className = 'disk';
        disk.setAttribute('data-size', i);
        disk.setAttribute('role', 'button');
        disk.setAttribute('tabindex', '0');
        disk.setAttribute('aria-label', `Anneau numéro ${i}`);
        
        // Largeur proportionnelle au numéro de l'anneau
        const width = 40 + (i * 25);
        disk.style.width = width + 'px';
        disk.textContent = i;
        
        tower1.appendChild(disk);
    }
}

// Fonction pour initialiser les écouteurs d'interaction (Étape 3)
function initializeInteractions() {
    // Ajouter les écouteurs de clic sur tous les anneaux
    document.querySelectorAll('.disk').forEach(disk => {
        disk.addEventListener('click', selectDisk);
    });
    
    // Ajouter les écouteurs de clic sur les tours
    document.querySelectorAll('.tower-pole').forEach(tower => {
        tower.addEventListener('click', function(e) {
            // Ne pas déclencher si on clique sur un anneau
            if (!e.target.classList.contains('disk')) {
                moveDiskToTower(this);
            }
        });
    });
}

// Fonction pour sélectionner un anneau (Clic 1 - Étape 3)
function selectDisk(e) {
    e.stopPropagation();
    
    const disk = e.target;
    const tower = disk.parentElement;
    
    // Vérifier que l'anneau cliqué est le dernier (le plus haut de la pile)
    const topDisk = tower.lastElementChild;
    if (disk !== topDisk) {
        console.log('⚠️ Vous ne pouvez sélectionner que l\'anneau au sommet de la pile');
        return;
    }
    
    // Si l'anneau est déjà sélectionné, le désélectionner
    if (selectedDisk === disk) {
        selectedDisk.classList.remove('selected');
        selectedDisk = null;
        console.log('Anneau désélectionné');
        return;
    }
    
    // Désélectionner l'anneau précédent
    if (selectedDisk !== null) {
        selectedDisk.classList.remove('selected');
    }
    
    // Sélectionner le nouvel anneau
    selectedDisk = disk;
    disk.classList.add('selected');
    console.log('✓ Anneau ' + disk.getAttribute('data-size') + ' sélectionné');
}

// Fonction pour déplacer l'anneau sélectionné vers une tour (Clic 2 - Étape 3)
function moveDiskToTower(targetTower) {
    // Vérifier qu'un anneau est sélectionné
    if (selectedDisk === null) {
        console.log('⚠️ Aucun anneau n\'est sélectionné. Cliquez d\'abord sur un anneau.');
        return;
    }
    
    // Vérifier que le jeu est actif (Étape 6)
    if (!gameActive) {
        console.log('⚠️ Jeu terminé. Cliquez sur "Démarrer" pour recommencer.');
        return;
    }
    
    // Récupérer la taille de l'anneau sélectionné
    const selectedSize = parseInt(selectedDisk.getAttribute('data-size'));
    
    // Vérifier la règle de Hanoï : l'anneau ne peut être déposé que sur un anneau plus grand
    const topDiskInTarget = targetTower.lastElementChild;
    
    if (topDiskInTarget !== null && topDiskInTarget.classList.contains('disk')) {
        const topSize = parseInt(topDiskInTarget.getAttribute('data-size'));
        
        if (selectedSize >= topSize) {
            console.log('✗ Mouvement illégal ! L\'anneau ' + selectedSize + ' est plus grand ou égal à l\'anneau ' + topSize);
            return;
        }
    }
    
    // Le mouvement est légal : déplacer l'anneau
    targetTower.appendChild(selectedDisk);
    console.log('✓ Anneau ' + selectedSize + ' déplacé avec succès');
    
    // Incrémenter le compteur (Étape 6)
    moveCounter++;
    updateMoveCounter();
    updatePerformance();
    
    // Vérifier la victoire (Étape 6)
    checkVictory();
    
    // Désélectionner l'anneau
    selectedDisk.classList.remove('selected');
    selectedDisk = null;
}

// Étape 5 : Algorithme récursif des Tours de Hanoï
function hanoi(n, from, to, aux) {
    const moves = [];
    
    function hanoiHelper(n, from, to, aux) {
        if (n === 1) {
            moves.push({ from: from, to: to });
        } else {
            hanoiHelper(n - 1, from, aux, to);
            moves.push({ from: from, to: to });
            hanoiHelper(n - 1, aux, to, from);
        }
    }
    
    hanoiHelper(n, from, to, aux);
    return moves;
}

// Fonction pour exécuter la démo automatique
async function runDemo() {
    if (demoInProgress) return;
    
    demoInProgress = true;
    const demoBtn = document.getElementById('demoBtn');
    const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');
    demoBtn.disabled = true;
    startBtn.disabled = true;
    resetBtn.disabled = true;
    demoBtn.textContent = 'Démo en cours...';
    
    // Réinitialiser le jeu avant la démo
    moveCounter = 0;
    gameActive = true;
    updateMoveCounter();
    updatePerformance();
    
    const diskCountVal = parseInt(document.getElementById('diskCount').value);
    
    // Générer la liste des mouvements (0=Tour1, 1=Tour2, 2=Tour3)
    const moves = hanoi(diskCountVal, 0, 2, 1);
    
    // Exécuter chaque mouvement avec un délai
    for (const move of moves) {
        await executeMove(move.from, move.to);
        await new Promise(resolve => setTimeout(resolve, DEMO_DELAY));
    }
    
    // Réactiver les boutons
    demoBtn.disabled = false;
    startBtn.disabled = false;
    resetBtn.disabled = false;
    demoBtn.textContent = 'Démo automatique';
    demoInProgress = false;
    gameActive = false;
    
    console.log('✓ Démo terminée ! Jeu résolu en ' + moves.length + ' mouvements.');
    
    // Afficher le modal de victoire après la démo (Étape 6)
    const minMoves = Math.pow(2, diskCountVal) - 1;
    const message = 'Démo automatique terminée !\n\nCoups effectués : ' + moveCounter + '\nCoups optimal : ' + minMoves;
    showVictoryModal(message);
}

// Fonction pour exécuter un mouvement de la tour source vers la tour cible
async function executeMove(fromIndex, toIndex) {
    const towers = document.querySelectorAll('.tower-pole');
    const fromTower = towers[fromIndex];
    const toTower = towers[toIndex];
    
    // Récupérer l'anneau au sommet de la tour source
    const diskToMove = fromTower.lastElementChild;
    
    if (diskToMove && diskToMove.classList.contains('disk')) {
        const diskSize = parseInt(diskToMove.getAttribute('data-size'));
        
        // Vérifier que le mouvement est légal
        const topDiskInTarget = toTower.lastElementChild;
        if (topDiskInTarget && topDiskInTarget.classList.contains('disk')) {
            const topSize = parseInt(topDiskInTarget.getAttribute('data-size'));
            if (diskSize >= topSize) {
                console.log('✗ Mouvement illégal détecté : anneau ' + diskSize + ' ne peut pas être placé sur ' + topSize);
                return;
            }
        }
        
        // Effectuer le mouvement
        toTower.appendChild(diskToMove);
        console.log('✓ [Démo] Anneau ' + diskSize + ' déplacé vers Tour ' + (toIndex + 1));
        
        // Incrémenter le compteur pendant la démo (Étape 6)
        moveCounter++;
        updateMoveCounter();
        updatePerformance();
    }
}

// ===== ÉTAPE 6 : Compteur, Victoire, Score, Reset, Mode sombre =====

// Fonction pour mettre à jour le compteur (Étape 6)
function updateMoveCounter() {
    document.getElementById('moveCounter').textContent = moveCounter;
}

// Fonction pour calculer et afficher le nombre de coups minimum (Étape 6)
function updateMinMoves() {
    const minMoves = Math.pow(2, diskCount) - 1;
    document.getElementById('minMoves').textContent = minMoves;
}

// Fonction pour calculer et afficher la performance (Étape 6)
function updatePerformance() {
    const minMoves = Math.pow(2, diskCount) - 1;
    let performance = '—';
    
    if (moveCounter > 0) {
        const ratio = moveCounter / minMoves;
        
        if (ratio <= 1) {
            performance = '🌟 Parfait !';
        } else if (ratio <= 1.2) {
            performance = '⭐ Excellent !';
        } else if (ratio <= 1.5) {
            performance = '✓ Correct';
        } else {
            performance = '📈 À améliorer…';
        }
    }
    
    document.getElementById('performance').textContent = performance;
}

// Fonction pour vérifier la victoire (Étape 6)
function checkVictory() {
    const towers = document.querySelectorAll('.tower-pole');
    const thirdTower = towers[2];
    
    // Vérifier si tous les anneaux sont dans la troisième tour
    const disksInThirdTower = thirdTower.querySelectorAll('.disk').length;
    
    if (disksInThirdTower === diskCount) {
        // Victoire !
        gameActive = false;
        const minMoves = Math.pow(2, diskCount) - 1;
        const message = 'Vous avez résolu le jeu en ' + moveCounter + ' coups !\n\nCoups minimum : ' + minMoves + '\nEcart : ' + (moveCounter - minMoves);
        
        showVictoryModal(message);
        console.log('🎉 Victoire ! Jeu résolu en ' + moveCounter + ' coups.');
    }
}

// Fonction pour afficher le modal de victoire (Étape 6)
function showVictoryModal(message) {
    const modal = document.getElementById('victoryModal');
    const messageEl = document.getElementById('victoryMessage');
    messageEl.textContent = message;
    modal.classList.remove('hidden');
}

// Fonction pour fermer le modal de victoire (Étape 6)
function closeVictoryModal() {
    const modal = document.getElementById('victoryModal');
    modal.classList.add('hidden');
}

// Fonction pour réinitialiser le jeu (Étape 6)
function resetGame() {
    selectedDisk = null;
    moveCounter = 0;
    gameActive = true;
    
    updateMoveCounter();
    updatePerformance();
    
    // Réinitialiser les tours
    document.querySelectorAll('.tower-pole').forEach(tower => {
        tower.innerHTML = '';
    });
    
    // Regénérer les anneaux dans la première tour
    generateDisks(diskCount);
    initializeInteractions();
    
    // Fermer le modal si ouvert
    closeVictoryModal();
    
    console.log('✓ Jeu réinitialisé.');
}

// Fonction pour basculer le mode sombre/clair (Étape 6)
function toggleDarkMode() {
    const body = document.body;
    const themeBtn = document.getElementById('themeBtn');
    
    body.classList.toggle('dark-mode');
    
    // Changer l'icône du bouton
    if (body.classList.contains('dark-mode')) {
        themeBtn.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeBtn.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
}

// Charger la préférence de thème sauvegardée (Étape 6)
function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    const themeBtn = document.getElementById('themeBtn');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeBtn.textContent = '☀️';
    } else {
        themeBtn.textContent = '🌙';
    }
}

// Liaison des boutons à leurs fonctions
document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');
    const demoBtn = document.getElementById('demoBtn');
    const themeBtn = document.getElementById('themeBtn');
    const victoryOkBtn = document.getElementById('victoryOkBtn');
    
    startBtn.addEventListener('click', startGame);
    resetBtn.addEventListener('click', resetGame);
    demoBtn.addEventListener('click', runDemo);
    themeBtn.addEventListener('click', toggleDarkMode);
    victoryOkBtn.addEventListener('click', closeVictoryModal);
    
    // Charger la préférence de thème au démarrage (Étape 6)
    loadThemePreference();
    
    // Initialiser le jeu
    updateMinMoves();
});
