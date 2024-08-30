 // Popup handling functions
 let popup = document.getElementById("popup");

 function openPopup() {
     popup.classList.add("open-popup");
 }

 function closePopup() {
     popup.classList.remove("open-popup");
 }

document.addEventListener('DOMContentLoaded', () => {
  const startGameButton = document.getElementById('startButton');
  const loadGameButton = document.getElementById('loadButton');
  
  if (startGameButton) {
      startGameButton.addEventListener('click', (event) => {
          event.preventDefault();
          sessionStorage.clear();
          localStorage.removeItem('gameSaveProgress');
          setTimeout(() => {
              window.location.href = 'Cutscene.html';
          }, 200);
      });
  }
  
  if (loadGameButton) {
    loadGameButton.addEventListener('click', (event) => {
        event.preventDefault();
        const savedProgress = localStorage.getItem('saveProgress'); // Retrieve using correct key
        if (savedProgress) {
            // Load the game
            setTimeout(() => {
                window.location.href = 'Wordle.html';
            }, 200);
        } else {
            // Alert if no saved progress is found
            alert("No saved game progress found.");
        }
    });
}
});




