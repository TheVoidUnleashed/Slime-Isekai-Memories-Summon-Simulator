// Characters List
const characters = ["SSR Hero", "SR Warrior", "R Mage", "C Slime"];

// Load saved pulls from LocalStorage
let pulls = JSON.parse(localStorage.getItem("gachaPulls")) || [];
updateHistory();

// Function to pull gacha
function pullGacha() {
    let result = characters[Math.
