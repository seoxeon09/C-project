const WIDTH = 40;
const HEIGHT = 20;
const MAX_SNAKE = 100;

const gameBoard = document.getElementById('gameBoard');
const scoreDisplay = document.getElementById('score');
const gameOverDisplay = document.getElementById('gameOver');

const UP = 0,
  RIGHT = 1,
  DOWN = 2,
  LEFT = 3;

let direction = LEFT;
let nextDirection = LEFT;
let gameover = false;

let snake = new Array(MAX_SNAKE);
let snake_length = 5;

let food = { x: 0, y: 0 };

let cells = [];

function init() {
  snake_length = 5;
  gameBoard.innerHTML = '';
  cells = [];

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      if (x === 0 || x === WIDTH - 1 || y === 0 || y === HEIGHT - 1) {
        cell.classList.add('wall');
      }
      gameBoard.appendChild(cell);
      cells.push(cell);
    }
  }

  const midX = Math.floor(WIDTH / 2);
  const midY = Math.floor(HEIGHT / 2);
  for (let i = 0; i < snake_length; i++) {
    snake[i] = { x: midX + i, y: midY };
  }

  direction = LEFT;
  nextDirection = LEFT;
  gameover = false;
  gameOverDisplay.textContent = '';

  placeFood();
  update();
}

function placeFood() {
  while (true) {
    let fx = Math.floor(Math.random() * (WIDTH - 2)) + 1;
    let fy = Math.floor(Math.random() * (HEIGHT - 2)) + 1;
    let overlap = false;

    for (let i = 0; i < snake_length; i++) {
      if (snake[i].x === fx && snake[i].y === fy) {
        overlap = true;
        break;
      }
    }

    if (!overlap) {
      food.x = fx;
      food.y = fy;
      break;
    }
  }
}

function getIndex(x, y) {
  return y * WIDTH + x;
}

function update() {
  if (gameover) return;

  if (
    (nextDirection === UP && direction !== DOWN) ||
    (nextDirection === RIGHT && direction !== LEFT) ||
    (nextDirection === DOWN && direction !== UP) ||
    (nextDirection === LEFT && direction !== RIGHT)
  ) {
    direction = nextDirection;
  }

  let head = { x: snake[0].x, y: snake[0].y };
  if (direction === UP) head.y--;
  else if (direction === RIGHT) head.x++;
  else if (direction === DOWN) head.y++;
  else if (direction === LEFT) head.x--;

  if (
    head.x === 0 ||
    head.x === WIDTH - 1 ||
    head.y === 0 ||
    head.y === HEIGHT - 1
  ) {
    endGame();
    return;
  }

  for (let i = 0; i < snake_length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      endGame();
      return;
    }
  }

  for (let i = snake_length - 1; i > 0; i--) {
    snake[i] = { x: snake[i - 1].x, y: snake[i - 1].y };
  }

  snake[0] = head;

  if (head.x === food.x && head.y === food.y) {
    if (snake_length < MAX_SNAKE) {
      snake[snake_length] = {
        x: snake[snake_length - 1].x,
        y: snake[snake_length - 1].y,
      };
      snake_length++;
    }
    placeFood();
  }

  draw();
  scoreDisplay.textContent = '점수: ' + (snake_length - 5);

  if (!gameover) {
    setTimeout(update, 100);
  }
}

function draw() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].className = 'cell';
  }

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      if (x === 0 || x === WIDTH - 1 || y === 0 || y === HEIGHT - 1) {
        cells[getIndex(x, y)].classList.add('wall');
      }
    }
  }

  cells[getIndex(food.x, food.y)].classList.add('food');

  for (let i = 0; i < snake_length; i++) {
    const segment = snake[i];
    if (i === 0)
      cells[getIndex(segment.x, segment.y)].classList.add('snake-head');
    else cells[getIndex(segment.x, segment.y)].classList.add('snake-body');
  }
}

function endGame() {
  gameover = true;
  gameOverDisplay.textContent =
    '💥 집게사장한테 잡혔어요! 점수: ' +
    (snake_length - 5) +
    '점\n엔터키로 다시 시작해요!';
}

window.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();

  switch (key) {
    case 'w':
      if (direction !== DOWN) nextDirection = UP;
      break;
    case 'd':
      if (direction !== LEFT) nextDirection = RIGHT;
      break;
    case 's':
      if (direction !== UP) nextDirection = DOWN;
      break;
    case 'a':
      if (direction !== RIGHT) nextDirection = LEFT;
      break;
    case 'enter':
      if (gameover) init();
      break;
  }
});

const startButton = document.getElementById('startButton');
startButton.addEventListener('click', () => {
  document.getElementById('score').style.display = 'block';
  document.getElementById('gameBoard').style.display = 'grid';
  document.getElementById('gameOver').style.display = 'block';
  startButton.style.display = 'none';
  init();
});

const bubbleContainer = document.querySelector('.bubble-container');
const bubbleCount = 20;
const bubbleImgSrc = '/images/비눗방울.png';

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
