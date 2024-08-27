let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    lives: 3
}

testShowScore();

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
            score.wins += 1;
            localStorage.setItem('score', JSON.stringify(score));
            testShowScore();
            resetGame();
        }, 300);  // Delay to ensure the color change is rendered
        
    } else if (currentRow < 5) {
        currentRow++;
        currentCol = 0;
    } else {
        alert("Game Over! The word was: " + wordAnswer);
        score.lives -= 1;
        localStorage.setItem('score', JSON.stringify(score));
        testShowScore();
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

function testShowScore(){
    console.log(`Wins: ${score.wins}, Losses: ${score.losses}`);
}

document.querySelector('.js-resetScore')
    .addEventListener('click', () => {
        score.wins = 0;
        score.lives = 3;
        localStorage.removeItem('score');
        testShowScore();
    }
)


// Function to load enemy image
function loadEnemyImage(level) {
    const enemyImage = document.querySelector('.js-enemy-image');
    if (enemyImage && level.enemies.length > 0) {
        enemyImage.src = level.enemies[0].image; // Load the image of the first enemy in the array
    } else {
        console.error("No enemy image found or image element missing.");
    }
}

// Load the first level's enemy image
loadEnemyImage(level1);


