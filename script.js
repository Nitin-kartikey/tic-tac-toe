const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");
const gameBoard = document.getElementById("game-board");

let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6] 
];

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (boardState[index] === "" && gameActive) {
      boardState[index] = currentPlayer;
      cell.textContent = currentPlayer;
      cell.classList.add(currentPlayer);

      let winningPattern = checkWinner();
      if (winningPattern) {
        statusText.textContent = `${currentPlayer} Wins!`;
        highlightWinningCells(winningPattern);
        drawWinningLine(winningPattern);
        gameActive = false;
        return;
      }

      // Check for draw
      if (!boardState.includes("")) {
        statusText.textContent = "Game Draw!";
        gameActive = false;
        return;
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusText.textContent = `${currentPlayer}'s turn`;
    }
  });
});

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      return pattern;
    }
  }
  return null;
}

function highlightWinningCells(pattern) {
  pattern.forEach(index => {
    cells[index].classList.add("win");
  });
}

function drawWinningLine(pattern) {
  const line = document.createElement("div");
  line.classList.add("diagonal-line");
  const patternString = pattern.join("-");
  
  if (patternString === "0-1-2") {
    line.classList.add("horizontal-0-1-2");
  } else if (patternString === "3-4-5") {
    line.classList.add("horizontal-3-4-5");
  } else if (patternString === "6-7-8") {
    line.classList.add("horizontal-6-7-8");
  } else if (patternString === "0-3-6") {
    line.classList.add("vertical-0-3-6");
  } else if (patternString === "1-4-7") {
    line.classList.add("vertical-1-4-7");
  } else if (patternString === "2-5-8") {
    line.classList.add("vertical-2-5-8");
  } else if (patternString === "0-4-8") {
    line.classList.add("diagonal-0-4-8");
  } else if (patternString === "2-4-6") {
    line.classList.add("diagonal-2-4-6");
  }
  gameBoard.appendChild(line);
}
restartBtn.addEventListener("click", () => {
  boardState.fill("");
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("X", "O", "win");
  });
  
  const lines = document.querySelectorAll(".diagonal-line");
  lines.forEach(line => line.remove());
  
  statusText.textContent = "X's turn";
  currentPlayer = "X";
  gameActive = true;
});