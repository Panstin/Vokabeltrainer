
let vocab = [];
let current = null;

async function loadVocab() {
  const response = await fetch("vokabeln.json");
  vocab = await response.json();
  loadWord();
}

function loadWord() {
  document.getElementById("result").textContent = "";
  const index = Math.floor(Math.random() * vocab.length);
  current = vocab[index];
  document.getElementById("question").textContent = current["de"].join(", ");
  document.getElementById("answer").value = "";
}

function checkAnswer() {
  const userInput = document.getElementById("answer").value.trim().toLowerCase();
  const correct = current["fr"].toLowerCase();
  const result = document.getElementById("result");
  if (userInput === correct) {
    result.textContent = "✅ Richtig!";
    result.style.color = "green";
  } else {
    result.textContent = "❌ Falsch. Richtige Antwort: " + current["fr"];
    result.style.color = "red";
  }
}

loadVocab();
