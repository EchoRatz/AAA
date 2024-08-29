const stat = JSON.parse(localStorage.getItem('stat')) || {
    wins: 0,
    lives: 3,
    attackDmg: 50,
}

let currentProgress = JSON.parse(localStorage.getItem('currentProgress')) || {
    currentLevel: 1,
    currentEnemy: 1,
    remainingLives: 3,
    currentEnemyHealth: 100
}

let saveProgress = JSON.parse(localStorage.getItem('currentProgress')) || {
    currentLevel: 1,
    currentEnemy: 1,
    remainingLives: 3,
    currentEnemyHealth: 100
}

let achievement = JSON.parse(localStorage.getItem('achievement')) || {
    wins: 0,
}

testShowstat();

// for testing purposes, make sure to use the test dictionary
console.log('test dictionary:', testDictionary);

let wordAnswer = realDictionary[Math.floor(Math.random() * realDictionary.length)];


console.log(`Word: ${wordAnswer}`);

let currentRow = 0;
let currentCol = 0;
const grid = document.querySelector('.wordle-grid');
console.log(`${grid}`);

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

// Call this function when the game initializes and whenever lives change
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

        for (let i = 0; i < 5; i++) {
            row.children[i].style.backgroundColor = '#538d4e';
        }
        
        // Reduce the enemy's health by the player's attack damage
        currentProgress.currentEnemyHealth -= stat.attackDmg;
        console.log(`${stat.attackDmg}`);
        console.log(`Enemy health is now: ${currentProgress.currentEnemyHealth}`);

        if (currentProgress.currentEnemyHealth <= 0) {
            // Move to the next enemy
            currentProgress.currentEnemy++;
            if (currentProgress.currentEnemy > levels[currentProgress.currentLevel - 1].enemies.length) {
                // If no more enemies, move to the next level
                currentProgress.currentLevel++;
                currentProgress.currentEnemy = 1; // Reset to the first enemy in the new level
            }

            // Load the new enemy or level
            loadLevelContent(); // Load the new background and enemy
        }

        // Save progress after each win
        localStorage.setItem('currentProgress', JSON.stringify(currentProgress));

        // Use setTimeout to ensure the background color change is visible before the alert
        setTimeout(() => {
            alert("Congratulations! You've guessed the word!");
            achievement.wins += 1;
            localStorage.setItem('achievement', JSON.stringify(achievement));
            testShowstat();
            resetGame();
        }, 300);  // Delay to ensure the color change is rendered
        
    } else if (currentRow < 5) {
        currentRow++;
        currentCol = 0;
    } else {
        alert("Game Over! The word was: " + wordAnswer);
        currentProgress.remainingLives -= 1;
        localStorage.setItem('currentProgress', JSON.stringify(currentProgress));
        updateHearts();
        testShowstat();
        if (currentProgress.remainingLives > 0) {
            resetGame();
        } else {
            // Game Over: Reset currentProgress to default values and restart the game
            alert("You've lost all lives. Progress is reset.");
            resetCurrentProgress();
            resetGame();
        }
    }

    
}

function resetCurrentProgress() {
    currentProgress = {
        currentLevel: 1,
        currentEnemy: 1,
        remainingLives: 3,
        currentEnemyHealth: levels[0].enemies[0].health // Set to the health of the first enemy
    };

    localStorage.setItem('currentProgress', JSON.stringify(currentProgress));
    updateHearts(); // Ensure hearts are updated after resetting progress

}


function resetGame() {
     // Clear the grid
     for (let i = 0; i < grid.children.length; i++) {
        const row = grid.children[i];
        for (let j = 0; j < row.children.length; j++) {
            row.children[j].textContent = '';
            row.children[j].style.backgroundColor = '';
        }
    }

    // Reset the row and column counters
    currentRow = 0;
    currentCol = 0;

    // Select a new word
    wordAnswer = realDictionary[Math.floor(Math.random() * realDictionary.length)];
    console.log(`New Word: ${wordAnswer}`);

    // Reload the level content
    loadLevelContent();
    updateHearts();
}

/* for debugging and reset
document.getElementById('resetStat').addEventListener('click', () => {
    stat.wins = 0;
    stat.lives = 3;
    stat.attackDmg = 50; // Ensure it resets to 50, not 20
    localStorage.setItem('stat', JSON.stringify(stat));
    achievement.wins = 0;
    localStorage.setItem('achievement', JSON.stringify(achievement));// Save the correct values
    updateHearts();
    testShowstat();
    togglePauseModal(); // Hide the modal after resetting the stat
});
*/


function testShowstat(){
    console.log(`Wins: ${achievement.wins}, Lives: ${currentProgress.remainingLives}`);
}



function loadEnemyImage() {
    const enemyImage = document.querySelector('.js-enemy-image');
    const level = levels[currentProgress.currentLevel - 1]; // Adjust for zero-based index

    if (enemyImage && level && level.enemies.length >= currentProgress.currentEnemy) {
        const enemy = level.enemies[currentProgress.currentEnemy - 1]; // Adjust for zero-based index
        enemyImage.src = enemy.image; // Load the image of the current enemy
        console.log(`Loaded enemy: ${enemy.type} with health: ${enemy.health}`);
    } else {
        console.error("No enemy image found or image element missing.");
    }
}

// Call this function when the game initializes or when the level/enemy changes
document.addEventListener('DOMContentLoaded', () => {
    loadEnemyImage(); // Load the current enemy image on page load
});


function loadBackgroundImage() {
    const upperSection = document.querySelector('.upper-section');
    const level = levels[currentProgress.currentLevel - 1]; // Adjust for zero-based index

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
    loadBackgroundImage(); // Load the current level's background
    loadEnemyImage(); // Load the current enemy image

    // Update the current enemy's health
   // Update the current enemy's health only if it's not already set
   if (currentProgress.currentEnemyHealth === undefined || currentProgress.currentEnemyHealth <= 0) {
    const level = levels[currentProgress.currentLevel - 1];
    if (level && level.enemies.length >= currentProgress.currentEnemy) {
        const enemy = level.enemies[currentProgress.currentEnemy - 1];
        currentProgress.currentEnemyHealth = enemy.health; // Set health to the current enemy's health
        console.log(`Loaded enemy: ${enemy.type} with health: ${currentProgress.currentEnemyHealth}`);
    }
}
}

// Call this combined function on page load or after loading progress
document.addEventListener('DOMContentLoaded', () => {
    loadLevelContent(); // Load both the background and enemy on page load
});


// Function to toggle the pause modal
function togglePauseModal() {
    const modal = document.getElementById('pauseModal');
    if (modal.style.display === "none" || modal.style.display === "") {
        modal.style.display = "flex"; // Show the modal
    } else {
        modal.style.display = "none"; // Hide the modal
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('pauseModal');
    modal.style.display = 'none'; // Ensure the modal is hidden initially
});


// Event listener for key press
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        togglePauseModal(); // Show the modal only when Esc is pressed
    }
});

// Event listener for "Continue" button
document.getElementById('continueGame').addEventListener('click', function() {
    togglePauseModal(); // Hide the modal and continue the game
});

// Event listener for "Return to Menu" button
document.getElementById('returnToMenu').addEventListener('click', function() {
    window.location.href = "index.html"; // Redirect to the menu or lobby
});

document.addEventListener('DOMContentLoaded', () => {
    const row1 = document.getElementById('row1');
    const row2 = document.getElementById('row2');
    const row3 = document.getElementById('row3');
  
    // Letters for each row based on a QWERTY layout
    const row1Letters = 'qwertyuiop'.split('');
    const row2Letters = 'asdfghjkl'.split('');
    const row3Letters = 'zxcvbnm'.split('');
  
  // Function to create keyboard buttons
  function createKeyboardRow(row, letters) {
    letters.forEach(letter => {
      const button = document.createElement('button');
      button.textContent = letter;
      button.classList.add('key-button');
      button.dataset.state = '0'; // Initialize with state 0
      button.addEventListener('click', () => cycleButtonState(button));
      row.appendChild(button);
    });
  }

  // Function to cycle the button's state between four different states (including the normal state)
  function cycleButtonState(button) {
    // Remove any existing state class
    button.classList.remove('state-1', 'state-2', 'state-3');
    
    // Determine the current state and cycle to the next one
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
      button.dataset.state = '0'; // Reset to normal state
    }
  }
  
    // Initialize the keyboard rows
    createKeyboardRow(row1, row1Letters);
    createKeyboardRow(row2, row2Letters);
    createKeyboardRow(row3, row3Letters);
  });

// Timer settings
let timeElapsed = 0; // Initial time in seconds
let timerInterval; // Variable to store the timer interval

// Function to start the count-up timer
function startCountUpTimer() {
  const timerDisplay = document.getElementById('timer');
  
  // Update the timer every second
  timerInterval = setInterval(() => {
    timeElapsed++; // Increase the elapsed time
    const minutes = Math.floor(timeElapsed / 60); // Calculate minutes
    const seconds = timeElapsed % 60; // Calculate remaining seconds

    // Format the time to MM:SS
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    // Update the timer display
    timerDisplay.textContent = `Time Elapsed: ${formattedTime}`;
  }, 1000); // Update every 1000 milliseconds (1 second)
}

// Optional function to stop the timer
function stopTimer() {
  clearInterval(timerInterval); // Stop the timer
}

// Optional function to reset the timer
function resetTimer() {
  timeElapsed = 0; // Reset elapsed time
  document.getElementById('timer').textContent = 'Time Elapsed: 00:00'; // Reset timer display
  stopTimer(); // Stop the existing timer if any
  startCountUpTimer(); // Restart the timer
}

// Start the timer when the game starts
document.addEventListener('DOMContentLoaded', () => {
  startCountUpTimer(); // Call this function when the page loads
});

