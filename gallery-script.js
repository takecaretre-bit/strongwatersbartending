// Gallery data - all images and videos from assets folder
const galleryItems = [
  { type: 'image', src: 'assets/07C99609-0506-47C2-9171-0CABA59DFF6A.jpg' },
  { type: 'image', src: 'assets/835435C5-9ECF-4B47-9F47-345F5F9ABA4C.jpg' },
  { type: 'image', src: 'assets/C35235B5-5D48-4BA4-B2DB-F92658588444.jpg' },
  { type: 'image', src: 'assets/C4280E69-0276-470E-BAD8-E75CD7AB60A9.jpg' },
  { type: 'image', src: 'assets/C4BF048C-AD7A-4D8E-8614-ED5422AE4BAC.jpg' },
  { type: 'image', src: 'assets/IMG_0277.jpg' },
  { type: 'image', src: 'assets/screenshot-2026-06-10-8.32.12-PM.png' },
  { type: 'image', src: 'assets/screenshot-2026-06-10-8.32.46-PM.png' },
  { type: 'image', src: 'assets/screenshot-2026-06-10-8.33.07-PM.png' },
  { type: 'video', src: 'assets/IMG_0283.MOV' },
  { type: 'video', src: 'assets/IMG_0284.MOV' },
  { type: 'video', src: 'assets/IMG_0287.MOV' },
  { type: 'video', src: 'assets/IMG_0288.MOV' },
  { type: 'video', src: 'assets/IMG_0500.mov' },
  { type: 'video', src: 'assets/IMG_0504.MOV' }
];

let currentIndex = 0;
const lightbox = document.getElementById('lightbox');
const imgEl = document.getElementById('lightbox-img');
const videoEl = document.getElementById('lightbox-video');
const counter = document.getElementById('current-index');

// Generate gallery grid thumbnails
function initGallery() {
  const grid = document.getElementById('gallery-grid');
  const totalItems = document.getElementById('total-items');

  totalItems.textContent = galleryItems.length;

  galleryItems.forEach((item, index) => {
    const figure = document.createElement('figure');
    figure.className = 'gallery-card';
    figure.tabIndex = 0;

    if (item.type === 'image') {
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = 'Gallery photo';
      figure.appendChild(img);
    } else {
      const video = document.createElement('video');
      video.src = item.src;
      video.muted = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.setAttribute('aria-hidden', 'true');
      figure.appendChild(video);

      const playIcon = document.createElement('div');
      playIcon.className = 'play-icon';
      playIcon.innerHTML = '&#9658;';
      figure.appendChild(playIcon);
    }

    const figcaption = document.createElement('figcaption');
    figcaption.className = 'gallery-card-meta';
    figcaption.innerHTML = `<span class="media-type">${item.type === 'image' ? 'Photo' : 'Video'}</span><span class="label">${item.type === 'image' ? 'Tap to view full photo' : 'Tap to watch video'}</span>`;
    figure.appendChild(figcaption);

    figure.setAttribute('aria-label', item.type === 'image' ? 'Open photo in lightbox' : 'Open video in lightbox');
    figure.addEventListener('click', () => openLightbox(index));
    figure.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });
    grid.appendChild(figure);
  });
}

// Open lightbox at specific index
function openLightbox(index) {
  currentIndex = index;
  lightbox.classList.add('show');
  displayItem(currentIndex);
}

// Display item in lightbox
function displayItem(index) {
  const item = galleryItems[index];
  counter.textContent = index + 1;

  if (item.type === 'image') {
    videoEl.pause();
    videoEl.removeAttribute('src');
    videoEl.load();
    imgEl.src = item.src;
    imgEl.style.display = 'block';
    videoEl.style.display = 'none';
  } else {
    imgEl.src = '';
    imgEl.style.display = 'none';
    videoEl.src = item.src;
    videoEl.style.display = 'block';
    videoEl.load();
  }
}

// Close lightbox
function closeLightbox() {
  lightbox.classList.remove('show');
  videoEl.pause();
  videoEl.removeAttribute('src');
  videoEl.load();
}

// Navigate to next
function nextItem() {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  displayItem(currentIndex);
}

// Navigate to previous
function prevItem() {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  displayItem(currentIndex);
}

// Event listeners
document.addEventListener('DOMContentLoaded', initGallery);

document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
document.querySelector('.lightbox-next').addEventListener('click', nextItem);
document.querySelector('.lightbox-prev').addEventListener('click', prevItem);

// Close on background click
document.getElementById('lightbox').addEventListener('click', (e) => {
  if (e.target.id === 'lightbox') closeLightbox();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('show')) return;
  if (e.key === 'ArrowRight') nextItem();
  if (e.key === 'ArrowLeft') prevItem();
  if (e.key === 'Escape') closeLightbox();
});
