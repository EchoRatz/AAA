function loadGame() {
    const savedGame = JSON.parse(localStorage.getItem('savedGame'));
    if (savedGame) {
        stat.lives = savedGame.lives;
        stat.wins = savedGame.wins;
        currentLevel = savedGame.currentLevel || 1; // Load saved level or default to 1
        wordAnswer = savedGame.wordAnswer || realDictionary[Math.floor(Math.random() * realDictionary.length)]; // Load or randomize
        updateHearts();
        alert("Game progress loaded!");
        resetGame(); // Reset game with loaded wordAnswer
    } else {
        alert("No saved game found!");
    }
}

document.getElementById('loadGame').addEventListener('click', loadGame);

