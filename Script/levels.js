// levels.js
const level1 = {
    levelNumber: 1,
    background: "Style/source/Background.png",
    enemies: [
        {
            type: "Dino1",
            health: 100,
            image: "Style/source/Dino/Dino1.png"
        },
        {
            type: "Dino2",
            health: 200,
            image: "Style/source/Dino/Dino2.png"
            // Add image paths if needed
        },
        {
            type: "Dino3",
            health: 500,
            image: "Style/source/Dino/Dino3.png"
            // Add image paths if needed
        },
        {
            type: "Dino4",
            health: 700,
            image: "Style/source/Dino/Dino4.png"
            // Add image paths if needed
        }
    ],
    objectives: [
        "defeat all enemies",
        "find the hidden treasure"
    ]
};

const level2 = {
    levelNumber: 2,
    background: "Style/source/Background.png",
    enemies: [
        {
            type: "Dino5",
            health: 1000,
            image: "Style/source/Dino/Dino5.png"
        },
        {
            type: "Dino6",
            health: 1200,
            image: "Style/source/Dino/Dino6.png"
            // Add image paths if needed
        },
        {
            type: "Dino7",
            health: 1500,
            image: "Style/source/Dino/Dino7.png"
            // Add image paths if needed
        },
        {
            type: "Dino8",
            health: 2000,
            image: "Style/source/Dino/Dino8.png"
            // Add image paths if needed
        }
    ],
    objectives: [
        "defeat all enemies",
        "find the hidden treasure"
    ]
};

const levels = [level1,level2];


