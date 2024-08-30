// Initialize both autoplay attempt and button click sounds on page load
document.addEventListener('DOMContentLoaded', () => {
  const menuMusic = document.getElementById('MenuMusic');
  const clickSound = document.getElementById('ClickSound');
  const startGameButton = document.getElementById('ClickButton');
  const loadGameButton = document.getElementById('loadButton');

  

  // Handle click event on the "Play Game" button
  startGameButton.addEventListener('click', (event) => {
    event.preventDefault();

    // Clear session storage to ensure a fresh start
    sessionStorage.clear();
    localStorage.removeItem('gameSaveProgress');

    setTimeout(() => {
      window.location.href = 'Cutscene.html';
    }, 200);
  });
});

  // Handle click event on the "Resume" button
  loadGameButton.addEventListener('click', (event) => {
    event.preventDefault();

    // Check if there is saved progress
    const savedProgress = localStorage.getItem('gameSaveProgress');
    if (savedProgress) {
      clickSound.currentTime = 0;
      clickSound.play();

      menuMusic.pause();
      menuMusic.currentTime = 0;

      // Skip the cutscene and go directly to the Wordle game
      setTimeout(() => {
        window.location.href = 'Wordle.html';
      }, 200);
    } else {
      alert("No saved game progress found.");
    }
  });
