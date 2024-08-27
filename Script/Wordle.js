//import { testDictionary, realDictionary } from './dictionary.js';

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
            resetGame();
        }, 100);  // Delay to ensure the color change is rendered
        
    } else if (currentRow < 5) {
        currentRow++;
        currentCol = 0;
    } else {
        alert("Game Over! The word was: " + wordAnswer);
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
