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
            // Handle correct guess
            console.log("Correct! Resetting the game...");
            setTimeout(resetGame, 2000); // Delay before resetting for feedback
        } else if (currentRow < 5) {
            currentRow++;
            currentCol = 0;
        } else {
            // Handle game over
            console.log("Game over! Resetting the game...");
            setTimeout(resetGame, 2000); // Delay before resetting for feedback
        }
    });
}

function flipCell(cell, index) {
    return new Promise((resolve) => {
        setTimeout(() => {
            cell.classList.add('flip');

            setTimeout(() => {
                const letter = cell.textContent;
                if (letter === wordAnswer[index]) {
                    cell.style.backgroundColor = '#538d4e';
                } else if (wordAnswer.includes(letter)) {
                    cell.style.backgroundColor = '#b59f3b';
                } else {
                    cell.style.backgroundColor = 'gray';
                }

                setTimeout(() => {
                    cell.classList.remove('flip');
                    resolve();
                }, 100);
            }, 400);
        }, index * 150);
    });
}

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
}
