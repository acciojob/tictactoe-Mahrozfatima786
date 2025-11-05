const submitBtn = document.getElementById("submit");
const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const gameBoardDiv = document.getElementById("game-board");
const messageDiv = document.querySelector(".message");
const boardDiv = document.getElementById("board");
const playerInputsDiv = document.getElementById("player-inputs");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "x";
let board = Array(9).fill("");

submitBtn.addEventListener("click", () => {
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();

  if (!player1 || !player2) {
    alert("Please enter both player names!");
    return;
  }

  playerInputsDiv.style.display = "none";
  gameBoardDiv.style.display = "block";

  currentPlayer = player1;
  messageDiv.textContent = `${currentPlayer}, you're up`;

  createBoard();
});

function createBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.id = i + 1;
    cell.addEventListener("click", () => makeMove(cell, i));
    boardDiv.appendChild(cell);
  }
}

function makeMove(cell, index) {
  if (cell.textContent !== "") return;

  cell.textContent = currentSymbol;
  board[index] = currentSymbol;

  const winningCombo = checkWinner();
  if (winningCombo) {
    highlightWinner(winningCombo);
    messageDiv.textContent = `${currentPlayer} congratulations you won!`;
    disableBoard();
    return;
  }

  if (board.every((c) => c !== "")) {
    messageDiv.textContent = "It's a draw!";
    return;
  }

  switchTurn();
}

function switchTurn() {
  if (currentPlayer === player1) {
    currentPlayer = player2;
    currentSymbol = "o";
  } else {
    currentPlayer = player1;
    currentSymbol = "x";
  }
  messageDiv.textContent = `${currentPlayer}, you're up`;
}

function checkWinner() {
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combo of winCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return combo;
    }
  }
  return null;
}

function highlightWinner(combo) {
  combo.forEach((index) => {
    document.getElementById(index + 1).classList.add("winner");
  });
}

function disableBoard() {
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.style.pointerEvents = "none";
  });
}
