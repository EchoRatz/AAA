// script.js

const dialogues = [
    { text: "Oh no, it's 3p.m already and i haven't feed the dinosaur yet, they must be very hungry by now.", portrait: "/Style/source/edogawa-conan.jpg" },
    { text: "Let's grab a bucket of meet and feed them now.", portrait: "/Style/source/edogawa-conan.jpg" },
    { text: "So hungry, where is my food!", portrait: "/Style/source/dinoAvatar.png" },
    { text: "RAWRRRRRRR!!!!", portrait: "/Style/source/dinoAvatar.png" },
    { text: "AAAAHHHH Why are you so aggressive today!", portrait: "/Style/source/edogawa-conan.jpg" }
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

      document.body.style.transition = 'background 0.5s ease';

      if (currentDialogueIndex === dialogues.length - 5) {
        document.body.style.background = 'url("/Style/source/CS1emptyChair.png")'; // Change the background to an image
      } else if (currentDialogueIndex === dialogues.length - 1) {
        document.body.style.background = 'url("/Style/source/CS4openEnclosure.png")'; // Special background for the last dialogue
      } else if (currentDialogueIndex === dialogues.length - 4) {
        document.body.style.background = 'url("/Style/source/CS2meet.png")'; // Change the background to an image
      } else if (currentDialogueIndex === dialogues.length - 3) {
        document.body.style.background = 'url("/Style/source/CS3enclosure.png")'; // Change the background to an image
      } else {
        document.body.style.background = 'url("/Style/source/CS3enclosure.png")'; // Default background image
      }
      
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundSize = '100% 50%';
      
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