// Characters List
const characters = ["SSR Hero", "SR Warrior", "R Mage", "C Slime"];

// Load saved pulls from LocalStorage
let pulls = JSON.parse(localStorage.getItem("gachaPulls")) || [];
updateHistory();

// Function to pull gacha
function pullGacha() {
    let result = characters[Math.floor(Math.random() * characters.length)];

    // Save result
    pulls.push(result);
    localStorage.setItem("gachaPulls", JSON.stringify(pulls));

    // Show result
    document.getElementById("result").innerText = "You got: " + result;
    updateHistory();
}

// Function to update pull history
function updateHistory() {
    let history = document.getElementById("history");
    history.innerHTML = "";
    
    pulls.forEach(pull => {
        let li = document.createElement("li");
        li.innerText = pull;
        history.appendChild(li);
    });
}
