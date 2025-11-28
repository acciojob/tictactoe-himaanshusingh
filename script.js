// First we will select all necessary nodes from document.
const userContainer = document.querySelector(".user-details-container");
const userOne = document.querySelector("#player1");
const userTwo = document.querySelector("#player2");
const startBtn = document.querySelector("#submit");
const gameBoard = document.querySelector(".board");
const cells = document.querySelectorAll(".cell");
const message = document.querySelector(".message");

// Create two flags and initialize it with falsy value.
let currentUser = "";
let gameStart = false;

// Add event listener on startBtn to start the game.
startBtn.addEventListener("click", () => {
  if (userOne.value != "" && userTwo.value != "") {
    userContainer.classList.toggle("display-none");
    gameBoard.classList.toggle("display-none");
    message.innerText = `${userOne.value}, you're up`;
    currentUser = userOne.value;
    gameStart = true;
  }
});

// Add event listener in all boxes to change the innerText.
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
          if (!gameStart) return;
          if (currentUser === userOne.value) {
            cell.innerText = "x";
            currentUser = userTwo.value;
            message.innerText = `${currentUser}, you're up`;
          } else {
            cell.innerText = "o";
            currentUser = userOne.value;
            message.innerText = `${currentUser}, you're up`;
          }
          checkWinner();
        }, { once: true });
});

// Create a function checkWinner to stop the game if anyone wins or draw.
function checkWinner() {
  const values = Array.from(cells).map((cell) => cell.innerText);
  const winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 4], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (values[a] && values[a] === values[b] && values[a] === values[c]) {
      const winnerName = values[a] === "x" ? userOne.value : userTwo.value;
      message.innerText = `${winnerName} congratulations you won!`;
      gameStart = false;
      return;
    }
  }
  if (values.every((val) => val !== "")) {
    message.innerText = "It's a draw!";
    gameStart = false;
    return;
  }
}
