const container = document.querySelector('.background-container');
for (let i = 0; i < 10; i++) {
  const img = document.createElement('img');
  img.src = 'random.png'; // 여기에 아래에 나오는 이미지 경로로 바꿔줘!
  img.style.left = Math.random() * 100 + 'vw';
  img.style.animationDuration = 5 + Math.random() * 5 + 's'; // 속도 랜덤
  container.appendChild(img);
}
