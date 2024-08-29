let normalStart = true;// Get the audio elements by their IDs
const backgroundMusic = document.getElementById('MenuMusic');
const clickSound = document.getElementById('ClickSound');

// Function to handle audio autoplay with retries
function attemptAutoplay() {
  // Start with audio muted to comply with autoplay policies
  backgroundMusic.muted = true;
  backgroundMusic.play().then(() => {
    console.log('Audio is playing.');
    backgroundMusic.muted = false; // Unmute after starting
  }).catch(error => {
    console.log('Autoplay was prevented:', error);
    // If autoplay is blocked, setup retry mechanism
    setupAutoplayRetry();
  });
}

// Function to retry playing audio when page becomes visible
function setupAutoplayRetry() {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      backgroundMusic.play().then(() => {
        console.log('Audio is playing after visibility change.');
        backgroundMusic.muted = false; // Unmute once playing
      }).catch(error => {
        console.log('Autoplay was still prevented after retry:', error);
      });
    }
  });
}

// Function to play the click sound
function playClickSound() {
  clickSound.currentTime = 0; // Reset the sound to the start to ensure it plays fully each time
  clickSound.play().catch(error => {
    console.error('Error playing click sound:', error); // Log any errors
  });
}

// Initialize both autoplay attempt and button click sounds on page load
document.addEventListener('DOMContentLoaded', () => {
  const menuMusic = document.getElementById('MenuMusic');
  const clickSound = document.getElementById('ClickSound');
  const startGameButton = document.getElementById('ClickButton');
  const loadGameButton = document.getElementById('loadButton');

  // Start playing the main menu music when the page loads
  menuMusic.volume = 0.5;
  menuMusic.play();
  attemptAutoplay(); // Try to autoplay background music

  // Handle click event on the "Play Game" button
  startGameButton.addEventListener('click', (event) => {
    event.preventDefault();
    normalStart = true; // Indicate a normal start

    clickSound.currentTime = 0;
    clickSound.play();

    menuMusic.pause();
    menuMusic.currentTime = 0;

    // Clear session storage to ensure a fresh start
    sessionStorage.clear();

    setTimeout(() => {
      window.location.href = 'Cutscene.html';
    }, 200);
  });

  // Handle click event on the "Resume" button
  loadGameButton.addEventListener('click', (event) => {
    event.preventDefault();
    normalStart = false; // Indicate that we are resuming from a saved game

    // Check if there is saved progress in localStorage
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
  // Add event listeners to all buttons for click sound
  const buttons = document.querySelectorAll('button'); // Select all button elements
  buttons.forEach(button => {
    button.addEventListener('click', playClickSound); // Attach click sound to each button
  });
});
