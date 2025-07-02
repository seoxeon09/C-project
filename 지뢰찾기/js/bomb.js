const SIZE = 8;
const MINES = 8;

let opened = 0;
let board = [];
let realBoard = [];
let revealed = [];

const dx = [-1, -1, -1, 0, 0, 1, 1, 1];
const dy = [-1, 0, 1, -1, 1, -1, 0, 1];

const boardEl = document.getElementById('board');
const resultEl = document.getElementById('result');

document.getElementById('startButton').addEventListener('click', () => {
  document.getElementById('board').style.display = 'table';
  initBoard();
  document.getElementById('startButton').style.display = 'none';
});

function initBoard() {
  boardEl.innerHTML = '';
  opened = 0;
  board = Array.from({ length: SIZE }, () => Array(SIZE).fill('_'));
  realBoard = Array.from({ length: SIZE }, () => Array(SIZE).fill('0'));
  revealed = Array.from({ length: SIZE }, () => Array(SIZE).fill(false));

  placeMines();
  calculateNumbers();

  for (let i = 0; i < SIZE; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < SIZE; j++) {
      const cell = document.createElement('td');
      cell.dataset.x = i;
      cell.dataset.y = j;
      row.appendChild(cell);
    }
    boardEl.appendChild(row);
  }

  // ✅ 이벤트 등록을 지연 (DOM 렌더링 보장)
  setTimeout(() => {
    boardEl.querySelectorAll('td').forEach((cell) => {
      cell.addEventListener('click', cellClicked);
    });
  }, 0);
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

function calculateNumbers() {
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      if (realBoard[i][j] === '*') continue;
      realBoard[i][j] = countMines(i, j).toString();
    }
  }
}

function countMines(x, y) {
  let count = 0;
  for (let dir = 0; dir < 8; dir++) {
    const nx = x + dx[dir];
    const ny = y + dy[dir];
    if (nx >= 0 && ny >= 0 && nx < SIZE && ny < SIZE) {
      if (realBoard[nx][ny] === '*') count++;
    }
  }
  return count;
}

function cellClicked(e) {
  const x = Number(e.target.dataset.x);
  const y = Number(e.target.dataset.y);

  if (isNaN(x) || isNaN(y)) return;

  const cell = boardEl.rows[x]?.cells[y];
  if (!cell) return;
  if (revealed[x][y]) return;

  if (realBoard[x][y] === '*') {
    cell.textContent = '💣';
    cell.classList.add('mine');
    resultEl.textContent = '💥 폭탄! Enter로 다시 시작하세요';
    revealAll();
    disableClicks();
    return;
  }

  reveal(x, y);

  if (opened === SIZE * SIZE - MINES) {
    resultEl.textContent = '🎉 클리어!';
    revealAll();
  }
}

function reveal(x, y) {
  const queue = [[x, y]];

  while (queue.length > 0) {
    const [cx, cy] = queue.shift();
    if (cx < 0 || cy < 0 || cx >= SIZE || cy >= SIZE) continue;
    if (revealed[cx][cy]) continue;

    const cell = boardEl.rows[cx]?.cells[cy];
    if (!cell) continue;

    const val = realBoard[cx][cy];
    cell.textContent = val === '0' ? '' : val;
    cell.classList.add('opened');
    if (val === '0') cell.classList.add('opened-zero');

    revealed[cx][cy] = true;
    opened++;

    if (val === '0') {
      for (let dir = 0; dir < 8; dir++) {
        const nx = cx + dx[dir];
        const ny = cy + dy[dir];
        if (nx >= 0 && ny >= 0 && nx < SIZE && ny < SIZE && !revealed[nx][ny]) {
          queue.push([nx, ny]);
        }
      }
    }
  }
}

function revealAll() {
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      const cell = boardEl.rows[i]?.cells[j];
      if (!cell) continue;

      if (realBoard[i][j] === '*') {
        cell.textContent = '💣';
        cell.classList.add('mine');
      } else {
        const val = realBoard[i][j];
        cell.textContent = val === '0' ? '' : val;
        cell.classList.add('opened');
        if (val === '0') cell.classList.add('opened-zero');
      }
    }
  }
}

function disableClicks() {
  boardEl.querySelectorAll('td').forEach((td) => {
    td.removeEventListener('click', cellClicked);
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') location.reload();
});

document.getElementById('board').style.display = 'none';

// 비눗방울
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

function playMusic() {
  const audio = document.getElementById('bg-music');
  audio.muted = false;
  audio.play();
}
