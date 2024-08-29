let stat = JSON.parse(localStorage.getItem('stat')) || {
    wins: 0,
    lives: 3,
    attackDmg: 20
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

    for (let i = 0; i < stat.lives; i++) {
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
        
        // Use setTimeout to ensure the background color change is visible before the alert
        setTimeout(() => {
            alert("Congratulations! You've guessed the word!");
            stat.wins += 1;
            localStorage.setItem('stat', JSON.stringify(stat));
            testShowstat();
            resetGame();
        }, 300);  // Delay to ensure the color change is rendered
        
    } else if (currentRow < 5) {
        currentRow++;
        currentCol = 0;
    } else {
        alert("Game Over! The word was: " + wordAnswer);
        stat.lives -= 1;
        localStorage.setItem('stat', JSON.stringify(stat));
        updateHearts();
        testShowstat();
        resetGame();
    }

    
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
}

function testShowstat(){
    console.log(`Wins: ${stat.wins}, Lives: ${stat.lives}`);
}



// Function to load enemy image
function loadEnemyImage(level) {
    const enemyImage = document.querySelector('.js-enemy-image');
    if (enemyImage && level.enemies.length > 0) {
        enemyImage.src = level.enemies[0].image; // Load the image of the first enemy in the array
    } else {
        console.error("No enemy image found or image element missing.");
    }
}

// Function to load background image
function loadBackgroundImage(level) {
    const upperSection = document.querySelector('.upper-section');
    if (upperSection && level.background) {
        upperSection.style.backgroundImage = `url(${level.background})`;
        upperSection.style.backgroundSize = 'cover';
        upperSection.style.backgroundPosition = 'center';
        upperSection.style.backgroundRepeat = 'no-repeat';
    } else {
        console.error("No background image found or element missing.");
    }
}

// Load the first level's enemy image
loadEnemyImage(level1);
loadBackgroundImage(level1);

// Function to toggle the pause modal
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

// Event listener for "Reset stat" button
document.getElementById('resetStat').addEventListener('click', () => {
    stat.wins = 0;
    stat.lives = 3;
    stat.attackDmg = 20;
    localStorage.removeItem('stat');
    updateHearts();
    testShowstat();
    togglePauseModal(); // Hide the modal after resetting the stat
});





