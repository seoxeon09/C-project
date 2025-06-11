const container = document.querySelector('.bubble-container');

function createBubble() {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');

  // 🎯 랜덤 크기 더 크게 & 다양하게 (50~120px)
  const size = Math.random() * 70 + 50;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;

  // 🎯 랜덤 위치
  bubble.style.left = `${Math.random() * window.innerWidth}px`;

  const startTop = window.innerHeight - (Math.random() * 100 + 50);
  bubble.style.top = `${startTop}px`;

  // 🎯 속도 빠르게 (3~7초 사이)
  bubble.style.animationDuration = `${Math.random() * 6 + 6}s`;

  container.appendChild(bubble);

  // 일정 시간 후 삭제
  setTimeout(() => {
    bubble.remove();
  }, duration * 1000);
}

// 🎯 생성 속도 빠르게 (원래 500 → 150ms)
setInterval(createBubble, 400);
