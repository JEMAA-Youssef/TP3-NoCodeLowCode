// Fonction appelée au démarrage du jeu
function startGame() {
    const diskCount = document.getElementById('diskCount').value;
    console.log('Jeu démarré avec ' + diskCount + ' anneaux');
    
    // Étape 2 : Générer les anneaux
    generateDisks(diskCount);
}

// Fonction pour générer les anneaux dans la première tour
function generateDisks(diskCount) {
    const tower1 = document.querySelector('.tower-pole');
    
    // Vider la première tour
    tower1.innerHTML = '';
    
    // Créer et empiler les anneaux (du plus grand au plus petit)
    for (let i = diskCount; i >= 1; i--) {
        const disk = document.createElement('div');
        disk.className = 'disk';
        
        // Largeur proportionnelle au numéro de l'anneau
        const width = 40 + (i * 25);
        disk.style.width = width + 'px';
        disk.style.setProperty('--disk-size', i);
        
        disk.textContent = i;
        tower1.appendChild(disk);
    }
}

// Liaison du bouton à la fonction
document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('startBtn');
    startBtn.addEventListener('click', startGame);
});
