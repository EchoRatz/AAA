const dialogues = [
    {
      text: "Oh no, it's 3p.m already and I haven't fed the dinosaur yet, they must be very hungry by now.",
      portrait: "/Style/source/Doc.png",
      name: "Doc" // Add character name
    },
    { 
      text: "Let's grab a bucket of meat and feed them now.", 
      portrait: "/Style/source/Doc.png", 
      name: "Doc" 
    },
    { 
      text: "So hungry, where is my food!", 
      portrait: "/Style/source/dinoAvatar.png", 
      name: "Dino" 
    },
    { 
      text: "RAWRRRRRRR!!!!", 
      portrait: "/Style/source/dinoAvatar.png", 
      name: "Dino" 
    },
    { 
      text: "AAAAHHHH Why are you so aggressive today!", 
      portrait: "/Style/source/Doc.png", 
      name: "Doc" 
    }
  ];
  
  let currentDialogueIndex = 0;
  const textContent = document.getElementById('text-content');
  const portrait = document.getElementById('portrait');
  const characterName = document.getElementById('character-name'); // New element reference
  const nextButton = document.getElementById('next-button');
  let typingInterval; // To store the typing interval
  let isTyping = false; // Flag to track typing status
  
  function updateDialogue() {
    console.log("Updating dialogue...");
    console.log("Current index:", currentDialogueIndex);
  
    if (currentDialogueIndex < dialogues.length) {
      const { text, portrait: portraitSrc, name } = dialogues[currentDialogueIndex]; // Destructure name
  
      // Clear previous typing interval if any
      clearInterval(typingInterval);
      
      // Clear text content and prepare for typing effect
      textContent.textContent = '';
      characterName.textContent = name; // Set character name
      
      // Update portrait source
      portrait.src = portraitSrc;
      portrait.onerror = function() {
        console.error('Failed to load image:', portraitSrc);
      };
  
      console.log("Text set to:", text);
      console.log("Portrait set to:", portraitSrc);
  
      document.body.style.transition = 'background 0.5s ease';
  
      // Change background based on dialogue index
      switch (currentDialogueIndex) {
        case 0:
          document.body.style.background = 'url("/Style/source/CS1emptyChair.png")';
          break;
        case 1:
          document.body.style.background = 'url("/Style/source/CS2meet.png")';
          break;
        case 2:
          document.body.style.background = 'url("/Style/source/CS3enclosure.png")';
          break;
        case dialogues.length - 1:
          document.body.style.background = 'url("/Style/source/CS4openEnclosure.png")';
          break;
        default:
          document.body.style.background = 'url("/Style/source/CS3enclosure.png")';
          break;
      }
  
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundSize = '100% 50%';
  
      // Trigger vibrate animation if the character is Dino
      if (name === "Dino") {
        triggerVibrateAnimation(); // Call the vibrate function
      }
  
      // Set typing flag to true and start typing animation
      isTyping = true; 
      typeText(text, () => {
        // Typing animation complete
        isTyping = false;
      });
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
      // If typing is in progress, complete it immediately
      clearInterval(typingInterval);
      const { text } = dialogues[currentDialogueIndex];
      textContent.textContent = text; // Show full text
      isTyping = false; // Set typing flag to false
    } else {
      // If typing is complete, go to the next dialogue
      if (currentDialogueIndex < dialogues.length - 1) {
        currentDialogueIndex++;
        updateDialogue();
      } else {
        // Redirect to next HTML file after the last dialogue
        redirectToNewPage('wordle.html');
      }
    }
  });
  
  // Initial dialogue setup
  updateDialogue();

  function redirectToNewPage(url) {
    console.log(`Redirecting to ${url}...`);
    window.location.href = url;
  }
  
  function triggerVibrateAnimation() {
    // Add the 'screen-vibrate' class to the body to start the animation
    document.body.classList.add('screen-vibrate');
  
    // Remove the 'screen-vibrate' class after the animation ends to reset
    setTimeout(() => {
      document.body.classList.remove('screen-vibrate');
    }, 500); // Match the timeout duration to the animation duration
  }
  