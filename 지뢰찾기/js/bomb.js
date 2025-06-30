const SIZE = 8;
const MINES = 8;

let opened = 0;
let board = Array.from({ length: SIZE }, () => Array(SIZE).fill('_'));
let realBoard = Array.from({ length: SIZE }, () => Array(SIZE).fill('0'));

const dx = [-1, -1, -1, 0, 0, 1, 1, 1];
const dy = [-1, 0, 1, -1, 1, -1, 0, 1];

const boardEl = document.getElementById('board');
const resultEl = document.getElementById('result');

function initBoard() {
  for (let i = 0; i < SIZE; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < SIZE; j++) {
      const cell = document.createElement('td');
      cell.dataset.x = i;
      cell.dataset.y = j;
      cell.addEventListener('click', cellClicked);
      row.appendChild(cell);
    }
    boardEl.appendChild(row);
  }
  placeMines();
}

function placeMines() {
  let placed = 0;
  while (placed < MINES) {
    const x = Math.floor(Math.random() * SIZE);
    const y = Math.floor(Math.random() * SIZE);
    if (realBoard[x][y] !== '*') {
      realBoard[x][y] = '*';
      placed++;
    }
  }
}

function countMines(x, y) {
  let count = 0;
  for (let dir = 0; dir < 8; dir++) {
    const nx = x + dx[dir];
    const ny = y + dy[dir];
    if (nx >= 0 && nx < SIZE && ny >= 0 && ny < SIZE) {
      if (realBoard[nx][ny] === '*') count++;
    }
  }
  return count;
}

function cellClicked(event) {
  const x = parseInt(event.target.dataset.x);
  const y = parseInt(event.target.dataset.y);
  const cell = event.target;

  if (cell.classList.contains('opened')) return;

  if (realBoard[x][y] === '*') {
    cell.textContent = '💣';
    cell.classList.add('mine');
    resultEl.textContent = 'GAME OVER';
    revealAll();
    disableClicks();
    return;
  }

  const count = countMines(x, y);
  cell.textContent = count;
  cell.classList.add('opened');
  opened++;

  if (opened === SIZE * SIZE - MINES) {
    resultEl.textContent = '무사히 통과하셨습니다!';
    revealAll();
  }
}

function revealAll() {
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      const cell = boardEl.rows[i].cells[j];
      if (realBoard[i][j] === '*') {
        cell.textContent = '💣';
        cell.classList.add('mine');
      } else if (!cell.classList.contains('opened')) {
        const count = countMines(i, j);
        cell.textContent = count;
        cell.classList.add('opened');
      }
    }
  }
}

function disableClicks() {
  boardEl
    .querySelectorAll('td')
    .forEach((td) => td.removeEventListener('click', cellClicked));
}

initBoard();

const bubbleContainer = document.querySelector('.bubble-container');
const bubbleCount = 20;
const bubbleImgSrc = 'images/비눗방울.png';

for (let i = 0; i < bubbleCount; i++) {
  const bubble = document.createElement('img');
  bubble.src = bubbleImgSrc;
  bubble.classList.add('bubble');

  bubble.style.left = `${Math.random() * 90}vw`;

  const size = 30 + Math.random() * 40;
  bubble.style.width = `${size}px`;

  bubble.style.animationDuration = `${8 + Math.random() * 7}s`;

  bubble.style.animationDelay = `${Math.random() * 15}s`;

  bubbleContainer.appendChild(bubble);
}
