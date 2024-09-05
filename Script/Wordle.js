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

function updateStageIndicator() {
    const stageIndicator = document.getElementById('stageIndicator');
    stageIndicator.textContent = `Stage: ${currentProgress.currentLevel}-${currentProgress.currentEnemy}`;
}

function checkGuess() {
    const row = grid.children[currentRow];
    let guessedWord = '';
    let flipPromises = [];

    for (let i = 0; i < 5; i++) {
        guessedWord += row.children[i].textContent;
        flipPromises.push(flipCell(row.children[i], i));
    }

    Promise.all(flipPromises).then(() => {
        if (guessedWord === wordAnswer) {
            currentProgress.currentEnemyHealth -= stat.attackDmg;
            updateHealthBar();
            console.log(`Enemy health: ${currentProgress.currentEnemyHealth}`);

            showDamageModal(`You have deal ${stat.attackDmg} to enemy`);

            if (currentProgress.currentEnemyHealth <= 0) {
                currentProgress.currentEnemy++;
                if (currentProgress.currentEnemy > levels[currentProgress.currentLevel - 1].enemies.length) {
                    currentProgress.currentLevel++;
                    currentProgress.currentEnemy = 1; 
                }
                updateStageIndicator();
                loadLevelContent();
            }

            setTimeout(() => {
                //alert(`You have deal ${stat.attackDmg} damage to dinosaur`);
                //showDamageModal();
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
            //alert("Game Over! The word was: " + wordAnswer);
            
            currentProgress.remainingLives -= 1;
            showDamageModal(`You have lost 1 live!`);
            updateHearts();
            testShowstat();
            if (currentProgress.remainingLives > 0) {
                resetGame();
            } else {
                //alert("You've lost all lives. Progress is reset.");zzz
                showDamageModal(`You've lost all lives. Progress is reset!`);
                resetCurrentProgress();
                resetGame();
            }
            saveProgress();
        }
    });
}

function flipCell(cell, index) {
    return new Promise((resolve) => {
        setTimeout(() => {
            cell.classList.add('flip');

            setTimeout(() => {
                // This will execute at the 50% mark of the flip animation
                const letter = cell.textContent;
                if (letter === wordAnswer[index]) {
                    cell.style.backgroundColor = '#538d4e';
                } else if (wordAnswer.includes(letter)) {
                    cell.style.backgroundColor = '#b59f3b';
                } else {
                    cell.style.backgroundColor = 'gray';
                }

                // Add a small delay to synchronize the text update smoothly with the animation
                setTimeout(() => {
                    cell.classList.remove('flip');
                    resolve();
                }, 100); // Ensure this delay fits your animation timing
            }, 400); // Half of the animation duration (0.8s)
        }, index * 150); // Slightly increased stagger for better effect
    });
}

// Get the hint button and hint display container
const hintButton = document.querySelector('.hintButton');
const hintShowContainer = document.querySelector('.hintShowContainer');

// Store positions that have already been hinted
let hintedPositions = [];

// Function to generate and append a hint, avoiding duplicates
function generateHint() {
    // Get the current word answer (already defined in your script)
    const word = wordAnswer.split(''); // Break the word into an array of letters

    // Stop if all 6 hints have been generated (one for each character)
    if (hintedPositions.length >= 6) {
        return;  // Do nothing when all hints are already revealed
    }

    // Find unhinted positions
    const unhintedPositions = word.map((_, index) => index).filter(index => !hintedPositions.includes(index));

    // If there are no unhinted positions left, stop the function
    if (unhintedPositions.length === 0) {
        return;
    }

    // Randomly select an unhinted position
    const randomIndex = Math.floor(Math.random() * unhintedPositions.length);
    const position = unhintedPositions[randomIndex];
    const letter = word[position];

    // Add the position to the hintedPositions array
    hintedPositions.push(position);

    // Create a new div for the hint
    const hintDiv = document.createElement('div');
    hintDiv.classList.add('hint-box');
    hintDiv.textContent = `${letter.toUpperCase()} is in position ${position + 1}`;
    
    // Append the hint div to the hintShowContainer
    hintShowContainer.appendChild(hintDiv);
}

// Add event listener to the hint button to append a hint on click
hintButton.addEventListener('click', generateHint);

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
        localStorage.setItem('saveProgress', JSON.stringify(progress)); // Save using correct key
        console.log('Progress saved to localStorage:', progress);
    } else {
        console.log('No progress found in sessionStorage to save.');
    }
}

// Add an event listener to the "Save" button
document.getElementById('saveGame').addEventListener('click', () => {
    alert(`progress have been saved`);
    saveProgressToLocalStorage(); // Save the current progress to localStorage
});

window.addEventListener('beforeunload', () => {
    saveProgress();
});

function resetGame() {
    for (let i = 0; i < grid.children.length; i++) {
        const row = grid.children[i];
        for (let j = 0; j < row.children.length; j++) {
            row.children[j].textContent = '';
            row.children[j].style.backgroundColor = '';
        }
    }

    // Reset the hints
    hintedPositions = []; // Clear the list of hinted positions
    hintShowContainer.textContent = ''; // Clear the displayed hints

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

function updateHealthBar() {
    const healthBar = document.querySelector('.js-health-bar');
    const enemy = levels[currentProgress.currentLevel - 1].enemies[currentProgress.currentEnemy - 1];
    const healthPercentage = (currentProgress.currentEnemyHealth / enemy.health) * 100;
    healthBar.style.width = `${healthPercentage}%`;
}

function loadLevelContent() {
    loadBackgroundImage();
    loadEnemyImage();

    if (currentProgress.currentEnemyHealth === undefined || currentProgress.currentEnemyHealth <= 0) {
        const level = levels[currentProgress.currentLevel - 1];
        if (level && level.enemies.length >= currentProgress.currentEnemy) {
            const enemy = level.enemies[currentProgress.currentEnemy - 1];
            currentProgress.currentEnemyHealth = enemy.health;
            updateHealthBar();
            console.log(`Loaded enemy: ${enemy.type} with health: ${currentProgress.currentEnemyHealth}`);
        }
    }
}

function togglePauseModal() {
    const modal = document.getElementById('pauseModal');
    modal.style.display = modal.style.display === "none" || modal.style.display === "" ? "flex" : "none";
}

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

function showDamageModal(message) {
    const damageModal = document.getElementById('showDamageModal');
    const damageValue = document.getElementById('damageValue');

    damageValue.textContent = message; // Update the modal content with the damage value
    damageModal.style.display = 'flex'; // Show the modal

    setTimeout(() => {
        damageModal.style.display = 'none'; // Hide the modal after 1 second
    }, 1000); // 1 second = 1000 milliseconds
}

document.addEventListener('DOMContentLoaded', () => {
    // Check if there's saved progress in sessionStorage
    if (sessionStorage.getItem('currentProgress')) {
        currentProgress = JSON.parse(sessionStorage.getItem('currentProgress'));
        console.log('Loaded progress from sessionStorage:', currentProgress);
    } else {
        resetCurrentProgress(); // Start fresh if no progress exists in sessionStorage
        console.log('Starting new game with fresh progress.');
    }
    // Load level content and hearts
    loadLevelContent(); 
    updateStageIndicator();
    updateHearts();
    sessionStorage.setItem('sessionSave', 'true');

    // Load the enemy image
    loadEnemyImage();

    // Load the background image
    loadBackgroundImage();

    // Initialize the keyboard
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

    // Initialize the pause modal
    const modal = document.getElementById('pauseModal');
    modal.style.display = 'none';

    const showDamageModalmodal = document.getElementById('showDamageModal');
    const damageValue = document.getElementById('damageValue');
    showDamageModalmodal.style.display = 'none';
});

