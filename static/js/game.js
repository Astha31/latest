// This script controls the puzzle game logic.
// It works with the HTML on the game page to update score, timer, and messages.

const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const movesElement = document.getElementById('moves');
const hintText = document.getElementById('hint-text');
const scrambledWord = document.getElementById('scrambled-word');
const answerInput = document.getElementById('answer-input');
const submitButton = document.getElementById('submit-button');
const restartButton = document.getElementById('restart-button');
const gameMessage = document.getElementById('game-message');

let currentIndex = 0;
let score = 0;
let moves = 0;
let timer = 90;
let intervalId = null;
let gameOver = false;

// Reset the game to a fresh start.
function resetGame() {
  currentIndex = 0;
  score = 0;
  moves = 0;
  timer = 90;
  gameOver = false;
  answerInput.value = '';
  updateDisplay();
  showPuzzle();
  startTimer();
  setMessage('Löse vier Wörter, bevor die Zeit abläuft!');
}

// Start or restart the countdown timer.
function startTimer() {
  if (intervalId) {
    clearInterval(intervalId);
  }
  intervalId = setInterval(() => {
    if (gameOver) {
      clearInterval(intervalId);
      return;
    }
    timer -= 1;
    updateDisplay();
    if (timer <= 0) {
      timer = 0;
      updateDisplay();
      endGame(false);
    }
  }, 1000);
}

// Update the score, timer, and move numbers on screen.
function updateDisplay() {
  scoreElement.textContent = score;
  timerElement.textContent = timer;
  movesElement.textContent = moves;
}

// Show the current scrambled puzzle and hint.
function showPuzzle() {
  const currentPuzzle = puzzleData[currentIndex];
  hintText.textContent = 'Hint: ' + currentPuzzle.hint;
  scrambledWord.textContent = currentPuzzle.scrambled;
  answerInput.value = '';
  answerInput.focus();
}

// Display a message for the player.
function setMessage(text) {
  gameMessage.textContent = text;
}

// Handle submitting an answer.
function submitAnswer() {
  if (gameOver) {
    return;
  }

  const userAnswer = answerInput.value.trim().toUpperCase();
  if (!userAnswer) {
    setMessage('Gib deine Antwort ein, dann drücke Überprüfen.');
    return;
  }

  moves += 1;
  const currentPuzzle = puzzleData[currentIndex];

  if (userAnswer === currentPuzzle.word) {
    score += 10;
    currentIndex += 1;
    if (currentIndex >= puzzleData.length) {
      endGame(true);
      return;
    }
    showPuzzle();
    setMessage('Gute Arbeit! Mach weiter, um das nächste Wort zu lösen.');
  } else {
    setMessage('Ups! Versuche es nochmal.');
  }
  updateDisplay();
}

// End the game with win or lose result.
function endGame(won) {
  gameOver = true;
  clearInterval(intervalId);
  answerInput.disabled = true;
  submitButton.disabled = true;

  if (won) {
    setMessage('Du gewinnst! Tolle Arbeit beim Lösen aller Wörter!');
  } else {
    setMessage('Zeit ist um! Versuche es nochmal für eine bessere Punktzahl.');
  }
}

submitButton.addEventListener('click', submitAnswer);
answerInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    submitAnswer();
  }
});
restartButton.addEventListener('click', () => {
  answerInput.disabled = false;
  submitButton.disabled = false;
  resetGame();
});

// Initialize the game when the page loads.
window.addEventListener('DOMContentLoaded', () => {
  if (!puzzleData || puzzleData.length === 0) {
    setMessage('Keine Rätsel-Daten verfügbar. Bitte aktualisiere die Seite.');
    return;
  }
  resetGame();
});
