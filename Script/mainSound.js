// Existing function to play sound remains mostly unchanged
function playSound(soundId) {
  const sound = document.getElementById(soundId);
  if (sound) {
    // Check if audio is loaded
    if (sound.readyState >= 3) { // HAVE_FUTURE_DATA or more
      sound.currentTime = 0; // Reset sound to start
      sound.play().catch(error => {
        console.error(`Error playing sound: ${soundId}`, error);
      });
    } else {
      // If audio is not ready, load it first and then play
      sound.addEventListener('canplaythrough', () => {
        sound.currentTime = 0; // Reset sound to start
        sound.play().catch(error => {
          console.error(`Error playing sound after load: ${soundId}`, error);
        });
      });
      sound.load();
    }
  } else {
    console.error(`Sound element with ID ${soundId} not found`);
  }
}

// Initialize audio controls based on the current HTML page
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
    case 'trainingmode.html':
      backgroundMusicId = 'GameMusic';
      break;
    default:
      backgroundMusicId = null; // No music by default
      break;
  }

  // If there is a valid background music ID, set up the play button
  if (backgroundMusicId) {
    const playButton = document.getElementById('playAudioButton');
    if (playButton) {
      playButton.addEventListener('click', () => {
        console.log('Play button clicked');
        playSound(backgroundMusicId);
      });
    }
  }
}

// Add event listeners to all buttons for the click sound effect
const buttons = document.querySelectorAll('button') // Select all buttons
buttons.forEach(button => {
    button.addEventListener('click', () => playSound('ClickEffect'))
})

document.addEventListener('DOMContentLoaded', initializeAudio);