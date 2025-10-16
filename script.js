// your JS code here. If required.
document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements
  const playerForm = document.getElementById("player-form");
  const gameBoard = document.getElementById("game-board");
  const player1Input = document.getElementById("player1");
  const player2Input = document.getElementById("player2");
  const submitBtn = document.getElementById("submit");
  const messageDiv = document.getElementById("message");
  const boardDiv = document.getElementById("board");
  const resetBtn = document.getElementById("reset");
  const player1NameSpan = document.getElementById("player1-name");
  const player2NameSpan = document.getElementById("player2-name");
  const player1Info = document.getElementById("player1-info");
  const player2Info = document.getElementById("player2-info");

  // Game state
  let currentPlayer = "x";
  let player1Name = "";
  let player2Name = "";
  let gameActive = true;
  let gameState = ["", "", "", "", "", "", "", "", ""];

  // Winning conditions
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  // Submit button click handler
  submitBtn.addEventListener("click", function () {
    player1Name = player1Input.value.trim() || "Player1";
    player2Name = player2Input.value.trim() || "Player2";

    if (player1Name && player2Name) {
      player1NameSpan.textContent = player1Name;
      player2NameSpan.textContent = player2Name;

      playerForm.style.display = "none";
      gameBoard.style.display = "block";

      updateMessage();
    }
  });

  // Cell click handler
  boardDiv.addEventListener("click", function (event) {
    const clickedCell = event.target;

    // Check if the clicked element is a cell and game is active
    if (clickedCell.classList.contains("cell") && gameActive) {
      const cellIndex = parseInt(clickedCell.id) - 1;

      // Check if cell is already played
      if (gameState[cellIndex] !== "") {
        return;
      }

      // Update game state and UI
      gameState[cellIndex] = currentPlayer;
      clickedCell.textContent = currentPlayer;
      clickedCell.classList.add(currentPlayer.toLowerCase());

      // Check for win or draw
      checkResult();
    }
  });

  // Reset button click handler
  resetBtn.addEventListener("click", function () {
    resetGame();
  });

  // Check game result
  function checkResult() {
    let roundWon = false;
    let winningCells = [];

    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      if (
        gameState[a] !== "" &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        roundWon = true;
        winningCells = [a, b, c];
        break;
      }
    }

    if (roundWon) {
      // Highlight winning cells
      winningCells.forEach((index) => {
        document
          .getElementById((index + 1).toString())
          .classList.add("winning-cell");
      });

      // Display winner message
      const winnerName = currentPlayer === "x" ? player1Name : player2Name;
      messageDiv.textContent = `${winnerName}, congratulations you won!`;
      gameActive = false;
      return;
    }

    // Check for draw
    if (!gameState.includes("")) {
      messageDiv.textContent = "Game ended in a draw!";
      gameActive = false;
      return;
    }

    // Continue game
    currentPlayer = currentPlayer === "x" ? "o" : "x";
    updateMessage();
  }

  // Update message and player indicators
  function updateMessage() {
    const currentPlayerName = currentPlayer === "x" ? player1Name : player2Name;
    messageDiv.textContent = `${currentPlayerName} congratulations you won!`;

    // Update active player indicator
    if (currentPlayer === "x") {
      player1Info.classList.add("active");
      player1Info.classList.remove("inactive");
      player2Info.classList.add("inactive");
      player2Info.classList.remove("active");
    } else {
      player2Info.classList.add("active");
      player2Info.classList.remove("inactive");
      player1Info.classList.add("inactive");
      player1Info.classList.remove("active");
    }
  }

  // Reset the game
  function resetGame() {
    currentPlayer = "x";
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];

    // Clear board
    document.querySelectorAll(".cell").forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("x", "o", "winning-cell");
    });

    // Reset message
    updateMessage();
  }
});
