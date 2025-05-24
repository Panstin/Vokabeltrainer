
let verbs = {};
let currentVerb = "";

async function loadVerbs() {
    const response = await fetch("franzoesische_verben_komplett.json");
    const data = await response.json();
    verbs = {};
    data.forEach(entry => {
        verbs[entry.französisch] = entry.konjugation.présent;
    });
    loadRandomVerb();
}

function loadRandomVerb() {
    const keys = Object.keys(verbs);
    currentVerb = keys[Math.floor(Math.random() * keys.length)];
    document.getElementById("verb").textContent = currentVerb;
    document.querySelectorAll("input").forEach(input => input.value = "");
    document.getElementById("results").classList.add("hidden");
}

function checkAnswers() {
    const answers = verbs[currentVerb];
    const tbody = document.querySelector("#results tbody");
    tbody.innerHTML = "";
    ["1ps", "2ps", "3ps", "1pp", "2pp", "3pp"].forEach(person => {
        const userInput = document.getElementById(person).value.trim();
        const correct = answers[person];
        const row = document.createElement("tr");
        row.className = userInput === correct ? "correct" : "incorrect";
        row.innerHTML = `<td>${person}</td><td>${userInput}</td><td>${correct}</td>`;
        tbody.appendChild(row);
    });
    document.getElementById("results").classList.remove("hidden");
}

window.onload = loadVerbs;
