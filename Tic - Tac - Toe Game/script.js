const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const resetButton = document.querySelector('.reset-button');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = cell.getAttribute('data-index');

  if (board[cellIndex] === '' && isGameActive) {
    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.style.backgroundColor = currentPlayer === 'X' ? '#f1c40f' : '#e67e22';
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWinner() {
  let roundWon = false;

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `¡${currentPlayer} ha ganado!`;
    isGameActive = false;
  } else if (!board.includes('')) {
    statusText.textContent = 'Empate';
    isGameActive = false;
  }
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  isGameActive = true;
  statusText.textContent = '';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.style.backgroundColor = '#fff';
  });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);