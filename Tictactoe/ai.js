const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("reset");
const playerNameButton = document.querySelector("#name");
playerNameButton.addEventListener("click", () => {
  playerNameButton.textContent = prompt("Enter new name");
});
const displayResult = document.querySelector(".display-result");
const winningPlayerNameTag = document.querySelector(".display-result > p");
let playerTurn = true;
let gameOver = false;
let answer;
function isBoardFull() {
  return [...cells].every((cell) => cell.textContent !== "");
}
function colorCells() {
  answer.forEach((item) => {
    cells[item].classList.add("win-highlight");
  });
}
function isWinner(symbol) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  function every(index) {
    return cells[index].textContent === symbol;
  }

  for (let i = 0; i < winningCombinations.length; i++) {
    let arr = winningCombinations[i];
    if (arr.every(every)) {
      answer = arr;
    }
  }
  return winningCombinations.some((combination) =>
    combination.every((index) => cells[index].textContent === symbol)
  );
}

function handleCellClick(event) {
  if (gameOver || event.target.textContent !== "") {
    return;
  }
  const player1Card = document.querySelector("#human");
  const player2Card = document.querySelector("#computer");
  event.target.textContent = playerTurn ? "X" : "O";

  if (event.target.textContent) {
    player1Card.style.filter = "brightness(1.2)";
    player2Card.style.filter = "brightness(1)";
  } else {
    player2Card.style.filter = "brightness(1.2)";
    player1Card.style.filter = "brightness(1)";
  }

  if (isWinner(event.target.textContent)) {
    gameOver = true;
    colorCells();
    let winner =
      event.target.textContent === "X"
        ? playerNameButton.textContent
        : "Computer";
    setTimeout(() => {
      winningPlayerNameTag.textContent = `${winner} has won!`;
      displayResult.classList.remove("hidden");
    }, 1000);
  } else if (isBoardFull()) {
    gameOver = true;
    let winner =
      event.target.textContent === "X"
        ? playerNameButton.textContent
        : "Computer";

    setTimeout(() => {
      winningPlayerNameTag.textContent = `It's a Tie`;
      displayResult.classList.remove("hidden");
    }, 1000);
  } else {
    playerTurn = !playerTurn;
    if (!playerTurn) {
      setTimeout(computerMove, 300);
    }
  }
}

function computerMove() {
  const emptyCells = [...cells].filter((cell) => cell.textContent === "");
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  emptyCells[randomIndex].textContent = "O";

  if (isWinner("O")) {
    gameOver = true;
    colorCells();
    setTimeout(() => {
      winningPlayerNameTag.textContent = `Computer has won!`;
      displayResult.classList.remove("hidden");
    }, 1000);
  } else if (isBoardFull()) {
    gameOver = true;
    setTimeout(() => {
      winningPlayerNameTag.textContent = `It's a Tie`;
      displayResult.classList.remove("hidden");
    }, 1000);
  } else {
    playerTurn = true;
  }
}

function resetGame() {
  displayResult.classList.add("hidden");
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("win-highlight");
  });
  playerTurn = true;
  gameOver = false;
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
