let stat = JSON.parse(localStorage.getItem('stat')) || {
    wins: 0,
    lives: 3,
    attackDmg: 50
};

let currentProgress = JSON.parse(sessionStorage.getItem('currentProgress')) || {
    currentLevel: 1,
    currentEnemy: 1,
    remainingLives: 3,
    currentEnemyHealth: 100
};

let achievement = JSON.parse(localStorage.getItem('achievement')) || {
    wins: 0,
};

// Check if there's saved progress in sessionStorage
if (sessionStorage.getItem('currentProgress')) {
    currentProgress = JSON.parse(sessionStorage.getItem('currentProgress'));
} else {
    resetCurrentProgress(); // Reset progress if not saved
}

testShowstat();

let wordAnswer = realDictionary[Math.floor(Math.random() * realDictionary.length)];
console.log(`Word : ${wordAnswer}`);
let currentRow = 0;
let currentCol = 0;
const grid = document.querySelector('.wordle-grid');

document.addEventListener('keydown', (event) => {
    if (event.key >= 'a' && event.key <= 'z') {
        if (currentCol < 5) {
            const row = grid.children[currentRow];
            row.children[currentCol].textContent = event.key;
            currentCol++;
        }
    } else if (event.key === 'Backspace' && currentCol > 0) {
        currentCol--;
        const row = grid.children[currentRow];
        row.children[currentCol].textContent = '';
    } else if (event.key === 'Enter' && currentCol === 5) {
        checkGuess();
    }
});

function updateHearts() {
    const heartContainer = document.querySelector('.js-heart-container');
    heartContainer.innerHTML = ''; // Clear the container

    for (let i = 0; i < currentProgress.remainingLives; i++) {
        const heart = document.createElement('img');
        heart.src = 'Style/source/heart.png'; // Path to your heart image
        heart.alt = 'Heart';
        heartContainer.appendChild(heart);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateHearts();
});

function checkGuess() {
    const row = grid.children[currentRow];
    let guessedWord = '';
    for (let i = 0; i < 5; i++) {
        guessedWord += row.children[i].textContent;
    }

    for (let i = 0; i < 5; i++) {
        const letter = row.children[i].textContent;
        if (letter === wordAnswer[i]) {
            row.children[i].style.backgroundColor = '#538d4e';
        } else if (wordAnswer.includes(letter)) {
            row.children[i].style.backgroundColor = '#b59f3b';
        } else {
            row.children[i].style.backgroundColor = 'gray';
        }
    }

    if (guessedWord === wordAnswer) {
        currentProgress.currentEnemyHealth -= stat.attackDmg;

        if (currentProgress.currentEnemyHealth <= 0) {
            currentProgress.currentEnemy++;
            if (currentProgress.currentEnemy > levels[currentProgress.currentLevel - 1].enemies.length) {
                currentProgress.currentLevel++;
                currentProgress.currentEnemy = 1; 
            }
            loadLevelContent();
        }

        setTimeout(() => {
            alert("Congratulations! You've guessed the word!");
            achievement.wins += 1;
            localStorage.setItem('achievement', JSON.stringify(achievement));
            testShowstat();
            resetGame();
            saveProgress();
        }, 300);
    } else if (currentRow < 5) {
        currentRow++;
        currentCol = 0;
    } else {
        alert("Game Over! The word was: " + wordAnswer);
        currentProgress.remainingLives -= 1;
        updateHearts();
        testShowstat();
        if (currentProgress.remainingLives > 0) {
            resetGame();
        } else {
            alert("You've lost all lives. Progress is reset.");
            resetCurrentProgress();
            resetGame();
        }
        saveProgress();
    }
}

function resetCurrentProgress() {
    currentProgress = {
        currentLevel: 1,
        currentEnemy: 1,
        remainingLives: 3,
        currentEnemyHealth: levels[0].enemies[0].health 
    };

    sessionStorage.setItem('currentProgress', JSON.stringify(currentProgress));
    updateHearts();
    loadLevelContent();
}

function saveProgress() {
    sessionStorage.setItem('currentProgress', JSON.stringify(currentProgress));
}

// New function to save progress from sessionStorage to localStorage
function saveProgressToLocalStorage() {
    const progress = JSON.parse(sessionStorage.getItem('currentProgress'));
    if (progress) {
        localStorage.setItem('saveProgress', JSON.stringify(progress));
        console.log('Progress saved to localStorage:', progress);
    } else {
        console.log('No progress found in sessionStorage to save.');
    }
}

// Add an event listener to the "Save" button
document.getElementById('saveGame').addEventListener('click', () => {
    saveProgressToLocalStorage(); // Save the current progress to localStorage
});

document.addEventListener('DOMContentLoaded', () => {
    // Check if there's saved progress in localStorage
    const savedProgress = JSON.parse(sessionStorage.getItem('currentProgress'));

    if (savedProgress) {
        currentProgress = savedProgress;
        console.log('Loaded progress from sessionStorage:', currentProgress);
    } else {
        resetCurrentProgress(); // Start fresh if no saved progress exists
        console.log('Starting new game with fresh progress.');
    }

    // Continue with the existing logic to load the level and start the game
    loadLevelContent(); 
    updateHearts();
    sessionStorage.setItem('sessionSave', 'true');
});


window.addEventListener('beforeunload', () => {
    saveProgress();
});

document.addEventListener('DOMContentLoaded', () => {
    loadLevelContent(); 
    sessionStorage.setItem('sessionSave', 'true');
});

function resetGame() {
    for (let i = 0; i < grid.children.length; i++) {
        const row = grid.children[i];
        for (let j = 0; j < row.children.length; j++) {
            row.children[j].textContent = '';
            row.children[j].style.backgroundColor = '';
        }
    }

    currentRow = 0;
    currentCol = 0;
    wordAnswer = realDictionary[Math.floor(Math.random() * realDictionary.length)];
    console.log(`Word : ${wordAnswer}`);
    loadLevelContent();
    updateHearts();
}

document.getElementById('resetStat').addEventListener('click', () => {
    stat.wins = 0;
    stat.lives = 3;
    stat.attackDmg = 50;
    localStorage.setItem('stat', JSON.stringify(stat));
    achievement.wins = 0;
    localStorage.setItem('achievement', JSON.stringify(achievement));
    updateHearts();
    testShowstat();
    togglePauseModal();
});

function testShowstat() {
    console.log(`Wins: ${achievement.wins}, Lives: ${currentProgress.remainingLives}`);
}

function loadEnemyImage() {
    const enemyImage = document.querySelector('.js-enemy-image');
    const level = levels[currentProgress.currentLevel - 1]; 

    if (enemyImage && level && level.enemies.length >= currentProgress.currentEnemy) {
        const enemy = level.enemies[currentProgress.currentEnemy - 1];
        enemyImage.src = enemy.image;
        console.log(`Loaded enemy: ${enemy.type} with health: ${enemy.health}`);
    } else {
        console.error("No enemy image found or image element missing.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadEnemyImage();
});

function loadBackgroundImage() {
    const upperSection = document.querySelector('.upper-section');
    const level = levels[currentProgress.currentLevel - 1];

    if (upperSection && level && level.background) {
        upperSection.style.backgroundImage = `url(${level.background})`;
        upperSection.style.backgroundSize = 'cover';
        upperSection.style.backgroundPosition = 'center';
        upperSection.style.backgroundRepeat = 'no-repeat';
        console.log(`Loaded background for level: ${currentProgress.currentLevel}`);
    } else {
        console.error("No background image found or element missing.");
    }
}

function loadLevelContent() {
    loadBackgroundImage();
    loadEnemyImage();

    if (currentProgress.currentEnemyHealth === undefined || currentProgress.currentEnemyHealth <= 0) {
        const level = levels[currentProgress.currentLevel - 1];
        if (level && level.enemies.length >= currentProgress.currentEnemy) {
            const enemy = level.enemies[currentProgress.currentEnemy - 1];
            currentProgress.currentEnemyHealth = enemy.health;
            console.log(`Loaded enemy: ${enemy.type} with health: ${currentProgress.currentEnemyHealth}`);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadLevelContent();
});

function togglePauseModal() {
    const modal = document.getElementById('pauseModal');
    modal.style.display = modal.style.display === "none" || modal.style.display === "" ? "flex" : "none";
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('pauseModal');
    modal.style.display = 'none';
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        togglePauseModal();
    }
});

document.getElementById('continueGame').addEventListener('click', function() {
    togglePauseModal();
});

document.getElementById('returnToMenu').addEventListener('click', function() {
    sessionStorage.removeItem('currentProgress');
    sessionStorage.removeItem('sessionSave');
    window.location.href = "index.html";
});

document.addEventListener('DOMContentLoaded', () => {
    const row1 = document.getElementById('row1');
    const row2 = document.getElementById('row2');
    const row3 = document.getElementById('row3');

    const row1Letters = 'qwertyuiop'.split('');
    const row2Letters = 'asdfghjkl'.split('');
    const row3Letters = 'zxcvbnm'.split('');

    function createKeyboardRow(row, letters) {
        letters.forEach(letter => {
            const button = document.createElement('button');
            button.textContent = letter;
            button.classList.add('key-button');
            button.dataset.state = '0';
            button.addEventListener('click', () => cycleButtonState(button));
            row.appendChild(button);
        });
    }

    function cycleButtonState(button) {
        button.classList.remove('state-1', 'state-2', 'state-3');

        if (button.dataset.state === '0') {
            button.dataset.state = '1';
            button.classList.add('state-1');
        } else if (button.dataset.state === '1') {
            button.dataset.state = '2';
            button.classList.add('state-2');
        } else if (button.dataset.state === '2') {
            button.dataset.state = '3';
            button.classList.add('state-3');
        } else {
            button.dataset.state = '0';
        }
    }

    createKeyboardRow(row1, row1Letters);
    createKeyboardRow(row2, row2Letters);
    createKeyboardRow(row3, row3Letters);
});
