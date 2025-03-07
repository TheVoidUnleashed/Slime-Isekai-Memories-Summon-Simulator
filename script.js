// Character data with rarity, types, and EX rates
const characters = {
    "3★": [
        { name: "Battle Character", rate: 43.25 },
        { name: "Protection Character", rate: 21.75 }
    ],
    "4★": [
        { name: "Battle Character", rate: 20.00 },
        { name: "Protection Character", rate: 10.00 }
    ],
    "5★": [
        { name: "Battle Character", rate: 3.75 },
        { name: "Protection Character", rate: 1.25 }
    ],
    "EX 5★": [
        { name: "EX Battle Character", rate: 0.200 }
    ],
    "EX Unbound 5★": [
        { name: "EX Unbound Battle Character", rate: 0.700 }
    ]
};

// Display featured EX units in the UI
function displayFeatured() {
    const featuredContainer = document.getElementById("featured");
    featuredContainer.innerHTML = ''; // Clear previous featured units

    // Display EX 5★ and EX Unbound 5★ units
    const ex5star = characters["EX 5★"][0];
    const exUnbound5star = characters["EX Unbound 5★"][0];

    // Create image display for featured units (just placeholders for now)
    featuredContainer.innerHTML += `
        <div>
            <img src="https://via.placeholder.com/80?text=EX5" alt="${ex5star.name}">
            <p>${ex5star.name}</p>
        </div>
        <div>
            <img src="https://via.placeholder.com/80?text=EXU5" alt="${exUnbound5star.name}">
            <p>${exUnbound5star.name}</p>
        </div>
    `;
}

// Pull Gacha with EX units
function pullGacha() {
    const rarityRoll = Math.random() * 100; // Random value between 0 and 100
    let rarity = "";

    if (rarityRoll < 65) {
        rarity = "3★";
    } else if (rarityRoll < 95) {
        rarity = "4★";
    } else if (rarityRoll < 99.5) {
        rarity = "5★"; // Includes normal 5★
    } else if (rarityRoll < 99.7) {
        rarity = "EX 5★"; // EX Battle 5★
    } else {
        rarity = "EX Unbound 5★"; // EX Unbound 5★
    }

    const rarityCharacters = characters[rarity];
    const characterRoll = Math.random() * 100;
    let chosenCharacter;
    let cumulativeRate = 0;

    // Choose character based on the rate within the rarity
    for (let i = 0; i < rarityCharacters.length; i++) {
        cumulativeRate += rarityCharacters[i].rate;
        if (characterRoll < cumulativeRate) {
            chosenCharacter = rarityCharacters[i].name;
            break;
        }
    }

    // Save result and update LocalStorage
    pulls.push(`${rarity} - ${chosenCharacter}`);
    localStorage.setItem("gachaPulls", JSON.stringify(pulls));

    // Show result and update history
    document.getElementById("result").innerText = `You got: ${rarity} - ${chosenCharacter}`;
    updateHistory();
}

// Update Pull History
function updateHistory() {
    let history = document.getElementById("history");
    history.innerHTML = "";

    pulls.forEach(pull => {
        let li = document.createElement("li");
        li.innerText = pull;
        history.appendChild(li);
    });
}

// Erase stored data and reset
function eraseData() {
    localStorage.removeItem("gachaPulls");
    pulls = [];
    document.getElementById("result").innerText = "";
    updateHistory();
}

// Load saved pulls from LocalStorage
let pulls = JSON.parse(localStorage.getItem("gachaPulls")) || [];
updateHistory();

// Display featured EX units
displayFeatured();
