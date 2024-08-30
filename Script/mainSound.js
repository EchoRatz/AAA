// Function to play a sound effect
function playSound(soundId) {
  const sound = document.getElementById(soundId)
  if (sound) {
      sound.currentTime = 0 // Reset sound to start
      sound.play().catch(error => {
          console.error(`Error playing sound: ${soundId}`, error)
      })
  } else {
      console.error(`Sound element with ID ${soundId} not found`)
  }
}

// Function to initialize audio controls
function initializeAudio() {
  // Attempt to set up background music autoplay
  const backgroundMusic = document.getElementById('MenuMusic')
  if (backgroundMusic) {
      backgroundMusic.volume = 0.5 // Set initial volume (optional)
      backgroundMusic.play().catch(error => {
          console.log('Background music autoplay prevented:', error)
      })
  } else {
      console.log('Background music element not found')
  }

  // Add event listeners to all buttons for the click sound effect
  const buttons = document.querySelectorAll('button') // Select all buttons
  buttons.forEach(button => {
      button.addEventListener('click', () => playSound('ClickEffect'))
  })
}

// Initialize audio controls after DOM content is fully loaded
document.addEventListener('DOMContentLoaded', initializeAudio)
