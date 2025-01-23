// Use DOM to access HTML elements
const rockBtn = document.getElementById('rock-btn');
const paperBtn = document.getElementById('paper-btn');
const scissorsBtn = document.getElementById('scissors-btn');

const winsDisplay = document.getElementById('wins-display');
const gameContainer = document.getElementById('game-container');
const outputDisplay = document.getElementById('game-output-display');
const scoreDisplay = document.getElementById('score-display');
const winnerDisplay = document.getElementById('game-winner-display');
const newGameBtn = document.getElementById('new-game-btn');
winnerDisplay.style.display = 'none';
newGameBtn.style.display = 'none';

// Get the record from local storage
let record = JSON.parse(localStorage.getItem('record')) ||
{
  playerWins: 0,
  playerLosses: 0
};

// Display player record
winsDisplay.innerText = `Player Wins: ${record.playerWins}, Player Losses: ${record.playerLosses}`;

// Initialize choice variables
let playerChoice;
let computerChoice;

// Function to get user's choice
function getUserChoice(choice) {
  if (choice === 'rock') {
    playerChoice = 'rock';
  } else if (choice === 'paper') {
    playerChoice = 'paper';
  } else if (choice === 'scissors') {
    playerChoice = 'scissors';
  }
}

// Add an event listener to each button
rockBtn.addEventListener('click', () => {
  getUserChoice('rock');
  updateDisplay();
});
paperBtn.addEventListener('click', () => {
  getUserChoice('paper');
  updateDisplay();
});
scissorsBtn.addEventListener('click', () => {
  getUserChoice('scissors');
  updateDisplay();
});

// Create a function to get the computer's choice
function getComputerChoice() {
  const options = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * 3); // 0, 1, or 2
  return options[randomIndex];
}

// Create a function to check if the player wins
function didPlayerWin(player, computer) {
  if (player === 'rock' && computer === 'scissors') {
    return true;
  } else if (player === 'scissors' && computer === 'paper') {
    return true;
  } else if (player === 'paper' && computer === 'rock') {
    return true;
  } else {
    return false;
  }
}

// Initialize Score
let playerScore = 0;
let computerScore = 0;

// Create a function to determine who wins, or if it is a tie
// and update the score
function updateScore() {
  computerChoice = getComputerChoice();

  if (didPlayerWin(playerChoice, computerChoice)) {
    playerScore++;
    return `Player Wins Round! ${playerChoice} beats ${computerChoice}`;
    // console.log(`Player Wins! ${playerChoice} beats ${computerChoice}`);
  } else if (playerChoice === computerChoice) {
    return `It is a tie. Both chose ${playerChoice}`;
    // console.log(`It is a tie. Both chose ${playerChoice}`);
  } else {
    computerScore++;
    return `Computer Wins Round! ${computerChoice} beats ${playerChoice}`;
    // console.log(`Computer Wins! ${computerChoice} beats ${playerChoice}`);
  }
}

function updateDisplay() {
  outputDisplay.innerText = updateScore();
  scoreDisplay.innerText = `Player Score: ${playerScore}, Computer Score: ${computerScore}`;
  
  // If player or computer wins 3 rounds, end the game
  if (playerScore >= 3) {
    record.playerWins++;
    gameContainer.style.display = 'none';
    winnerDisplay.innerText = 'You win the game!';
    winnerDisplay.style.display = 'block';
    newGameBtn.style.display = 'block';
    winsDisplay.innerText = `Player Wins: ${record.playerWins}, Player Losses: ${record.playerLosses}`;
  } else if (computerScore >= 3) {
    record.playerLosses++;
    gameContainer.style.display = 'none';
    winnerDisplay.innerText = 'You lose the game.';
    winnerDisplay.style.display = 'block';
    newGameBtn.style.display = 'block';
    winsDisplay.innerText = `Player Wins: ${record.playerWins}, Player Losses: ${record.playerLosses}`;
  }

  // save record to localStorage
  localStorage.setItem('record', JSON.stringify(record));
}

// Create a function to start a new game
function newGame() {
  playerScore = 0;
  computerScore = 0;
  scoreDisplay.innerText = `Player Score: ${playerScore}, Computer Score: ${computerScore}`;
  outputDisplay.innerText = 'Pick any choice to begin playing.';
  gameContainer.style.display = 'flex';
  newGameBtn.style.display = 'none';
  winnerDisplay.innerText = '';
  winnerDisplay.style.display = 'none';
}
newGameBtn.addEventListener('click', newGame);
