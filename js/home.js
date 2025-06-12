function goToMain() {
  window.location.href = '/tutorial.html'; // 👉 여기에 이동할 경로 입력!
}

const bubbleContainer = document.querySelector('.bubble-container');
const bubbleCount = 20; // 원하는 비눗방울 개수
const bubbleImgSrc = '/images/비눗방울.png'; // 비눗방울 이미지 파일명

for (let i = 0; i < bubbleCount; i++) {
  const bubble = document.createElement('img');
  bubble.src = bubbleImgSrc;
  bubble.classList.add('bubble');

  // 랜덤 left 위치 (0~90vw 사이)
  bubble.style.left = `${Math.random() * 90}vw`;

  // 랜덤 크기 (100px ~ 150px)
  const size = 30 + Math.random() * 40;
  bubble.style.width = `${size}px`;

  // 랜덤 애니메이션 시간 (8 ~ 10초)
  bubble.style.animationDuration = `${8 + Math.random() * 7}s`;

  // 랜덤 애니메이션 시작 지연 (0 ~ 10초)
  bubble.style.animationDelay = `${Math.random() * 15}s`;

  bubbleContainer.appendChild(bubble);
}
