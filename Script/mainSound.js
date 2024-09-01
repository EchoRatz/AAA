// Function to play a sound effect
function playSound(soundId) {
    const sound = document.getElementById(soundId);
    if (sound) {
      sound.currentTime = 0; // Reset sound to start
      sound.play().catch(error => {
        console.error(`Error playing sound: ${soundId}`, error);
      });
    } else {
      console.error(`Sound element with ID ${soundId} not found`);
    }
  }

// Function to initialize audio controls based on the current HTML page
function initializeAudio() {
    const page = window.location.pathname.split('/').pop(); // Get the current page name
    let backgroundMusicId;
  
    // Determine which music to play based on the current HTML file
    switch (page) {
      case 'index.html':
        backgroundMusicId = 'MenuMusic';
        break;
      case 'Wordle.html':
        backgroundMusicId = 'GameMusic';
        break;
      case 'Cutscene.html':
        backgroundMusicId = 'CutsceneMusic';
        break;
      // Add more cases as needed
      default:
        console.warn('No specific background music defined for this page');
      return; // Exit if no specific music for the page
    }

 // Attempt to set up background music autoplay
 const backgroundMusic = document.getElementById(backgroundMusicId);
 if (backgroundMusic) {
   backgroundMusic.volume = 0.3; // Set initial volume (optional)
   backgroundMusic.play().catch(error => {
     console.log('Background music autoplay prevented:', error);
   });
 } else {
   console.log(`Background music element with ID ${backgroundMusicId} not found`);
 }

// Add event listeners to all buttons for the click sound effect
const buttons = document.querySelectorAll('button') // Select all buttons
buttons.forEach(button => {
    button.addEventListener('click', () => playSound('ClickEffect'))
})
}

// Call initializeAudio on page load
window.addEventListener('DOMContentLoaded', initializeAudio);