// C 스타일 스네이크 게임의 JS 구현
const WIDTH = 40;
const HEIGHT = 20;
const MAX_SNAKE = 100;

// 게임판 요소
const gameBoard = document.getElementById('gameBoard');
const scoreDisplay = document.getElementById('score');
const gameOverDisplay = document.getElementById('gameOver');

// 방향 상수 (C처럼 define한 것처럼 사용)
const UP = 0,
  RIGHT = 1,
  DOWN = 2,
  LEFT = 3;

let direction = LEFT;
let nextDirection = LEFT;
let gameover = false;

// 뱀 구조체 배열 (C 스타일)
let snake = new Array(MAX_SNAKE);
let snake_length = 5;

// 음식 위치 구조체
let food = { x: 0, y: 0 };

// 셀 배열 (그리드)
let cells = [];

// 초기화 함수
function init() {
  snake_length = 5;
  gameBoard.innerHTML = '';
  cells = [];

  // 격자판 초기화
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

  // 뱀 초기 위치 (중앙에서 오른쪽으로)
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

// 음식 위치 지정
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

// 좌표를 인덱스로 변환
function getIndex(x, y) {
  return y * WIDTH + x;
}

// 게임 상태 업데이트
function update() {
  if (gameover) return;

  // 반대방향 이동 막기
  if (
    (nextDirection === UP && direction !== DOWN) ||
    (nextDirection === RIGHT && direction !== LEFT) ||
    (nextDirection === DOWN && direction !== UP) ||
    (nextDirection === LEFT && direction !== RIGHT)
  ) {
    direction = nextDirection;
  }

  // 머리 위치 계산 (C 스타일 구조체 복사)
  let head = { x: snake[0].x, y: snake[0].y };
  if (direction === UP) head.y--;
  else if (direction === RIGHT) head.x++;
  else if (direction === DOWN) head.y++;
  else if (direction === LEFT) head.x--;

  // 벽 충돌
  if (
    head.x === 0 ||
    head.x === WIDTH - 1 ||
    head.y === 0 ||
    head.y === HEIGHT - 1
  ) {
    endGame();
    return;
  }

  // 몸 충돌
  for (let i = 0; i < snake_length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      endGame();
      return;
    }
  }

  // 몸통 이동 (C처럼 배열 뒤에서부터 앞으로 이동)
  for (let i = snake_length - 1; i > 0; i--) {
    snake[i] = { x: snake[i - 1].x, y: snake[i - 1].y };
  }

  // 머리 갱신
  snake[0] = head;

  // 음식 먹었는지 확인
  if (head.x === food.x && head.y === food.y) {
    if (snake_length < MAX_SNAKE) {
      // 새로운 꼬리 추가 (현재 꼬리 복사)
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

// 게임판 그리기
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

// 게임 종료
function endGame() {
  gameover = true;
  gameOverDisplay.textContent =
    '💥 집게사장한테 잡혔어요! 점수: ' +
    (snake_length - 5) +
    '점\n엔터키로 다시 시작해요!';
}

// 방향 입력 처리 (C 느낌으로 switch 사용)
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

// 게임 시작
init();
