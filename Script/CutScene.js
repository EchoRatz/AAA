const dialogues = [
  {
    text: "Oh no, it's 3p.m already and I haven't fed the dinosaur yet, they must be very hungry by now.",
    portrait: "./Style/source/CutsceneMC.png",
    name: "Doc" 
  },
  { 
    text: "Let's grab a bucket of meat and feed them now.", 
    portrait: "./Style/source/CutsceneMC.png", 
    name: "Doc" 
  },
  { 
    text: "So hungry, where is my food!", 
    portrait: "./Style/source/dinoAvatar.png", 
    name: "Dino" 
  },
  { 
    text: "RAWRRRRRRR!!!!", 
    portrait: "./Style/source/dinoAvatar.png", 
    name: "Dino" 
  },
  { 
    text: "AAAAHHHH Why are you so aggressive today!", 
    portrait: "./Style/source/CutsceneMC.png", 
    name: "Doc" 
  }
];

let currentDialogueIndex = 0;
const textContent = document.getElementById('text-content');
const portrait = document.getElementById('portrait');
const characterName = document.getElementById('character-name'); 
const nextButton = document.getElementById('next-button');
let typingInterval; 
let isTyping = false; 

function updateDialogue() {
  console.log("Updating dialogue...");
  console.log("Current index:", currentDialogueIndex);

  if (currentDialogueIndex < dialogues.length) {
    const { text, portrait: portraitSrc, name } = dialogues[currentDialogueIndex];

    // Clear previous typing interval if any
    clearInterval(typingInterval);
    
    // Clear text content and prepare for typing effect
    textContent.textContent = ''; // Clear only text content
    characterName.textContent = name; // Set character name

    // Update portrait source without any effect
    portrait.src = portraitSrc;
    portrait.onerror = function() {
      console.error('Failed to load image:', portraitSrc);
    };

    // Resize portrait using CSS class rather than JavaScript
    resizePortrait(); // Only adjust the CSS properties

    document.body.style.transition = 'background 0.5s ease'; // Background transition only

    // Change background based on dialogue index
    switch (currentDialogueIndex) {
      case 0:
        document.body.style.background = 'url("./Style/source/CS1emptyChair.png")';
        break;
      case 1:
        document.body.style.background = 'url("./Style/source/CS2meet.png")';
        break;
      case 2:
        document.body.style.background = 'url("./Style/source/CS3enclosure.png")';
        break;
      case dialogues.length - 1:
        document.body.style.background = 'url("./Style/source/CS4openEnclosure.png")';
        break;
      default:
        document.body.style.background = 'url("./Style/source/CS3enclosure.png")';
        break;
    }

    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = '100% 50%';

    if (name === "Dino") {
      triggerVibrateAnimation(); 
    }

    // Set typing flag to true and start typing animation
    isTyping = true; 
    typeText(text, () => {
      isTyping = false; // Typing animation complete
    });
  }
}

function resizePortrait() {
  // Example resizing logic
  if (window.innerWidth < 600) {
    portrait.style.width = '100px';  // Smaller size for smaller screens
    portrait.style.height = 'auto';  // Maintain aspect ratio
  } else {
    portrait.style.width = '200px';  // Larger size for larger screens
    portrait.style.height = 'auto';  // Maintain aspect ratio
  }
}

function typeText(text, callback) {
  let index = 0;
  const speed = 50; // Typing speed in milliseconds

  function typeCharacter() {
    if (index < text.length) {
      textContent.textContent += text.charAt(index);
      index++;
    } else {
      clearInterval(typingInterval); // Stop typing when done
      if (typeof callback === 'function') callback(); // Call the callback function if provided
    }
  }

  typingInterval = setInterval(typeCharacter, speed);
}

document.body.addEventListener('click', () => {
  if (isTyping) {
    clearInterval(typingInterval);
    const { text } = dialogues[currentDialogueIndex];
    textContent.textContent = text; 
    isTyping = false; 
  } else {
    if (currentDialogueIndex < dialogues.length - 1) {
      currentDialogueIndex++;
      updateDialogue();
    } else {
      redirectToNewPage('wordle.html');
    }
  }
});

updateDialogue();

function redirectToNewPage(url) {
  console.log(`Redirecting to ${url}...`);
  window.location.href = url;
}

function triggerVibrateAnimation() {
  document.body.classList.add('screen-vibrate');
  setTimeout(() => {
    document.body.classList.remove('screen-vibrate');
  }, 500); 
}

function skipToWordle(){
  window.location.href = 'wordle.html';
}