// Variable globale pour stocker l'anneau sélectionné
let selectedDisk = null;

// Fonction appelée au démarrage du jeu
function startGame() {
    const diskCount = parseInt(document.getElementById('diskCount').value);
    console.log('Jeu démarré avec ' + diskCount + ' anneaux');
    
    // Réinitialiser l'état du jeu
    selectedDisk = null;
    
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
    
    // Désélectionner l'anneau
    selectedDisk.classList.remove('selected');
    selectedDisk = null;
}

// Liaison du bouton à la fonction
document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('startBtn');
    startBtn.addEventListener('click', startGame);
});
