// Fonction appelée au démarrage du jeu
function startGame() {
    const diskCount = document.getElementById('diskCount').value;
    console.log('Jeu démarré avec ' + diskCount + ' anneaux');
    // À implémenter dans les étapes suivantes
}

// Liaison du bouton à la fonction
document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('startBtn');
    startBtn.addEventListener('click', startGame);
});
