// levels.js
const level1 = {
    levelNumber: 1,
    background: "Style/source/Background.png",
    enemies: [
        {
            type: "ijo",
            health: 100,
            image: "Style/source/Dino/ijo.png"
        },
        {
            type: "merah",
            health: 200,
            image: "Style/source/Dino/merah.jpg"
            // Add image paths if needed
        },
        {
            type: "kuning",
            health: 500,
            image: "Style/source/Dino/kuning.png"
            // Add image paths if needed
        }
    ],
    objectives: [
        "defeat all enemies",
        "find the hidden treasure"
    ]
};

const levels = [level1];


