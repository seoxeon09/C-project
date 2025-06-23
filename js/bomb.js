let SIZE = 8;
let MINES = 8;
let opened = 0;
let board = [];
let realBoard = [];
const boardEl = document.getElementById('board');

function initBoard() {
  for (let i = 0; i < SIZE; i++) {
    board[i] = [];
    realBoard[i] = [];
    const row = document.createElement('tr');
    for (let j = 0; j < SIZE; j++) {
      board[i][j] = '_';
      realBoard[i][j] = '0';

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
  const dx = [-1, -1, -1, 0, 0, 1, 1, 1];
  const dy = [-1, 0, 1, -1, 1, -1, 0, 1];
  let count = 0;
  for (let i = 0; i < 8; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];
    if (nx >= 0 && nx < SIZE && ny >= 0 && ny < SIZE) {
      if (realBoard[nx][ny] === '*') count++;
    }
  }
  return count;
}

function cellClicked(e) {
  const x = parseInt(e.target.dataset.x);
  const y = parseInt(e.target.dataset.y);
  openCell(x, y);
  if (opened === SIZE * SIZE - MINES) {
    document.getElementById('result').textContent = '무사히 통과하셨습니다!';
    revealAll();
  }
}

function openCell(x, y) {
  const cell = boardEl.rows[x].cells[y];
  if (cell.classList.contains('opened')) return;

  if (realBoard[x][y] === '*') {
    cell.textContent = '💣';
    cell.classList.add('mine');
    document.getElementById('result').textContent = 'GAME OVER';
    revealAll();
    boardEl
      .querySelectorAll('td')
      .forEach((td) => td.removeEventListener('click', cellClicked));
    return;
  }

  const count = countMines(x, y);
  cell.textContent = count === 0 ? '' : count;
  cell.classList.add('opened');
  opened++;

  if (count === 0) {
    const dx = [-1, -1, -1, 0, 0, 1, 1, 1];
    const dy = [-1, 0, 1, -1, 1, -1, 0, 1];
    for (let i = 0; i < 8; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      if (nx >= 0 && nx < SIZE && ny >= 0 && ny < SIZE) {
        openCell(nx, ny);
      }
    }
  }
}

function revealAll() {
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      const cell = boardEl.rows[i].cells[j];
      if (realBoard[i][j] === '*' && !cell.classList.contains('mine')) {
        cell.textContent = '💣';
        cell.classList.add('mine');
      } else if (!cell.classList.contains('opened')) {
        const count = countMines(i, j);
        cell.textContent = count === 0 ? '' : count;
        cell.classList.add('opened');
      }
    }
  }
}

function resetBoard() {
  opened = 0;
  board = [];
  realBoard = [];
  boardEl.innerHTML = '';
  document.getElementById('result').textContent = '';
  initBoard();
}

window.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    resetBoard();
  }
});

function setDifficulty(level) {
  if (level === 'easy') {
    SIZE = 8;
    MINES = 8;
  } else if (level === 'medium') {
    SIZE = 12;
    MINES = 20;
  } else if (level === 'hard') {
    SIZE = 16;
    MINES = 40;
  }
  resetBoard();
}

initBoard();

// 비눗방울 애니메이션
const bubbleContainer = document.querySelector('.bubble-container');
const bubbleCount = 20;
const bubbleImgSrc = '/images/비눗방울.png'; // 이미지 경로를 너가 사용 중인 걸로 맞춰줘!

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
