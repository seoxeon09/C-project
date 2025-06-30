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
