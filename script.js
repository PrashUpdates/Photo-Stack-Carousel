const images = [
  { src: "https://i.natgeofe.com/n/10b06e7a-949d-4b2a-b7e0-c15ff0e867f0/mtfuji.png", title: "Mount Fuji", location: "Japan" },
  { src: "https://www.seeingsam.com/wp-content/uploads/2024/07/3-Days-in-Santorini-4.jpg", title: "Santorini", location: "Greece" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Akihabara2019spring.jpg?utm_source=en.wikivoyage.org&utm_campaign=index&utm_content=original", title: "Akihabara", location: "Japan" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7eCuLTm8UvTrYE_VxOJrQhA5be_8TkyJReu5OYIVmb8QO0JujW0o3LVvq&s=10", title: "Kyoto Gion District", location: "Japan" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd2-xhFP8n0yeBOH6f8aGX55lfDq3mL91XWSyxU_njIzkwKSVGcU6WvXU&s=10", title: "Petra, Jordan", location: "Middle East" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQswrbRZcpSthydbwspTVO8iJ09kvUYg5bObmtSelx7P3O3KtiJ2s-0ztNe&s=10", title: "Cappadocia", location: "Turkey" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8_WwULRF2_ysvk0ThNB3DjhyHLrRVkO_--JubPcMSejVtYZy-ZSCkhtuy&s=10", title: "Lofoten Islands", location: "Norway" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMo_6m9eAIbUT6ZXNYuY8n5QkGJMTjwLGnZHHpyV3yqEdkvhcbuhHNiXpW&s=10", title: "Faroe Islands", location: "North Atlantic" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmepss3IA4E1SFHkkXVgDp4vLo3x5vF3_9NeUXemk8-l9Qsc92o5-Kw9w&s=10", title: "Colosseum, Rome", location: "Italy, Europe" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_yVoqeNTXY_FzWnXUU0V1vxcL3bz8oHWZWXgWwtps7EUPgYcbTnOfmPg&s=10", title: "Neuschwanstein Castle", location: "Germany" }
];

const stage = document.getElementById('stage');
const progress = document.getElementById('progress');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const frameLabel = document.getElementById('frameLabel');
const frameCount = document.getElementById('frameCount');
const captionTitle = document.getElementById('captionTitle');
const captionSub = document.getElementById('captionSub');

let current = 0;
let dragStartX = 0;
let dragOffset = 0;
let isDragging = false;
let cardWidth = 220;
const SWIPE_THRESHOLD = 55;

function pad(n){ return String(n).padStart(2, '0'); }

function measure(){
  const firstCard = stage.querySelector('.card');
  if (firstCard) cardWidth = firstCard.offsetWidth;
}

function buildCards(){
  stage.innerHTML = '';
  images.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = i;

    if (item.src) {
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.title || ('image ' + (i + 1));
      img.draggable = false;
      card.appendChild(img);
    } else {
      card.classList.add('placeholder');
      card.textContent = 'Image ' + (i + 1) + ' ka link daalo';
    }

    stage.appendChild(card);
  });

  progress.innerHTML = '';
  images.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.addEventListener('click', () => goTo(i));
    progress.appendChild(dot);
  });
}

function layout(liveOffsetPx = 0){
  const spacing = cardWidth * 0.58;
  const cards = stage.children;

  for (let i = 0; i < cards.length; i++){
    const card = cards[i];
    const offset = i - current;
    const dragUnits = liveOffsetPx / spacing;
    const effectiveOffset = offset - dragUnits;
    const x = offset * spacing + liveOffsetPx;
    const dist = Math.abs(effectiveOffset);

    let scale, opacity;
    if (dist < 1){
      scale = 1 - dist * 0.22;
      opacity = 1 - dist * 0.65;
    } else {
      scale = 0.78;
      opacity = dist > 2 ? 0 : 0.3;
    }

    const rotateY = effectiveOffset * -10;
    const z = Math.round(100 - dist * 10);

    card.style.transform = `translateX(${x}px) scale(${scale}) rotateY(${rotateY}deg)`;
    card.style.opacity = opacity;
    card.style.zIndex = z;
  }

  const dots = progress.children;
  for (let i = 0; i < dots.length; i++){
    dots[i].classList.toggle('active', i === current);
  }

  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === images.length - 1;
}

function updateText(){
  frameLabel.textContent = 'FRAME ' + pad(current + 1);
  frameCount.textContent = pad(current + 1) + ' / ' + pad(images.length);

  const item = images[current];
  captionTitle.style.opacity = 0;
  captionSub.style.opacity = 0;

  setTimeout(() => {
    captionTitle.textContent = item.title || '';
    captionSub.textContent = item.location || '';
    captionTitle.style.opacity = 1;
    captionSub.style.opacity = 1;
  }, 160);
}

function goTo(index){
  const clamped = Math.max(0, Math.min(images.length - 1, index));
  if (clamped === current) { layout(); return; }
  current = clamped;
  layout();
  updateText();
}

buildCards();
measure();
layout();
updateText();
window.addEventListener('resize', () => { measure(); layout(); });

// click a side card to jump to it
stage.addEventListener('click', (e) => {
  if (Math.abs(dragOffset) > 5) return;
  const card = e.target.closest('.card');
  if (!card) return;
  const idx = Number(card.dataset.index);
  if (idx !== current) goTo(idx);
});

// ---- Pointer-based drag (mouse + touch + pen, works on desktop and mobile) ----
stage.addEventListener('pointerdown', (e) => {
  isDragging = true;
  dragStartX = e.clientX;
  dragOffset = 0;
  [...stage.children].forEach(c => c.classList.add('dragging'));
  stage.setPointerCapture(e.pointerId);
});

stage.addEventListener('pointermove', (e) => {
  if (!isDragging) return;
  dragOffset = e.clientX - dragStartX;
  layout(dragOffset);
});

function endDrag(){
  if (!isDragging) return;
  isDragging = false;
  [...stage.children].forEach(c => c.classList.remove('dragging'));

  if (dragOffset > SWIPE_THRESHOLD) {
    goTo(current - 1);
  } else if (dragOffset < -SWIPE_THRESHOLD) {
    goTo(current + 1);
  } else {
    layout();
  }
  dragOffset = 0;
}

stage.addEventListener('pointerup', endDrag);
stage.addEventListener('pointercancel', endDrag);
stage.addEventListener('pointerleave', () => { if (isDragging) endDrag(); });

// arrow buttons — left goes back, right goes forward
prevBtn.addEventListener('click', () => goTo(current - 1));
nextBtn.addEventListener('click', () => goTo(current + 1));

// keyboard support (desktop)
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') goTo(current - 1);
  if (e.key === 'ArrowRight') goTo(current + 1);
});
