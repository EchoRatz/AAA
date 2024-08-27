// script.js

const dialogues = [
    { text: "Welcome to the world of the web game!", portrait: "/Style/source/edogawa-conan.jpg" },
    { text: "Your journey begins now. Are you ready?", portrait: "/Style/source/edogawa-conan.jpg" },
    { text: "Remember to check your inventory often.", portrait: "/Style/source/edogawa-conan.jpg" }
  ];
  
  let currentDialogueIndex = 0;

  const textContent = document.getElementById('text-content');
  const portrait = document.getElementById('portrait');
  const nextButton = document.getElementById('next-button');
  
  function updateDialogue() {
    console.log("Updating dialogue...");
    console.log("Current index:", currentDialogueIndex);
    if (currentDialogueIndex < dialogues.length) {
      const { text, portrait: portraitSrc } = dialogues[currentDialogueIndex];
      textContent.textContent = text;
      portrait.src = portraitSrc;
  
      portrait.onerror = function() {
        console.error('Failed to load image:', portraitSrc);
      };
  
      console.log("Text set to:", text);
      console.log("Portrait set to:", portraitSrc);
    } else {
      // Automatically redirect to another HTML file after a short delay
      setTimeout(() => redirectToNewPage('nextpage.html'), 2000);  // 2000 milliseconds (2 seconds) delay
    }
  }
  
  nextButton.addEventListener('click', () => {
    currentDialogueIndex++;
    updateDialogue();
  });
  
  // Initialize dialogue on page load
  updateDialogue();

// Function to redirect to another HTML file
function redirectToNewPage(url) {
  console.log(`Redirecting to ${url}...`);
  window.location.href = "/Wordle.html"; // Redirects to the new HTML page
}