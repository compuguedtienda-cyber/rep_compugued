const track = document.querySelector('.slider-track');
let slides = Array.from(track.children);
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');

let index = 0;
let slideWidth;
let autoplayInterval;

/* CLONES */
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

slides = Array.from(track.children);
index = 1;

function setPosition() {
  slideWidth = slides[0].clientWidth;
  track.style.transform = `translateX(-${slideWidth * index}px)`;
}

window.addEventListener('load', setPosition);
window.addEventListener('resize', setPosition);

function moveNext() {
  if (index >= slides.length - 1) return;
  index++;
  track.style.transition = 'transform 0.4s ease';
  track.style.transform = `translateX(-${slideWidth * index}px)`;
}

function movePrev() {
  if (index <= 0) return;
  index--;
  track.style.transition = 'transform 0.4s ease';
  track.style.transform = `translateX(-${slideWidth * index}px)`;
}

next.addEventListener('click', moveNext);
prev.addEventListener('click', movePrev);

track.addEventListener('transitionend', () => {
  if (slides[index].isEqualNode(firstClone)) {
    track.style.transition = 'none';
    index = 1;
    track.style.transform = `translateX(-${slideWidth * index}px)`;
  }
  if (slides[index].isEqualNode(lastClone)) {
    track.style.transition = 'none';
    index = slides.length - 2;
    track.style.transform = `translateX(-${slideWidth * index}px)`;
  }
});

/* AUTOPLAY */
function startAutoplay() {
  autoplayInterval = setInterval(moveNext, 3500);
}
startAutoplay();

/* SHARE */
async function sharePage(){
  if(navigator.share){
    await navigator.share({
      title:'COMPUGUED',
      text:'Catálogo Tecnológico',
      url:location.href
    });
  } else {
    navigator.clipboard.writeText(location.href);
    alert('Enlace copiado');
  }
}

/* REDES */
function goToFace(){
  window.location.href = 'https://www.facebook.com/compugued.tec';
}

function goToInst(){
  window.location.href = 'https://www.instagram.com/compugued/';
}

function goToMap(){
  window.location.href = 'mapa.html';
}