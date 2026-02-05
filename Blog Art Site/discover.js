const vinyls = document.querySelectorAll('.vinyl');
const leftArrow = document.querySelector('.arrow-left');
const rightArrow = document.querySelector('.arrow-right');
const cassetteBtn = document.querySelector('.cassette-btn');
const cassetteImg = cassetteBtn.querySelector('img');
const player = document.getElementById('player');

let positions = ['left', 'center', 'right'];


function updatePositions() {
  vinyls.forEach((vinyl, index) => {
    vinyl.className = 'vinyl ' + positions[index];
  });
}


function getCenterVinyl() {
  return document.querySelector('.vinyl.center');
}

function loadCurrentTrack() {
  const vinyl = getCenterVinyl();
  const audioSrc = vinyl.dataset.audio;

  if (!player.currentSrc || !player.currentSrc.includes(audioSrc)) {
    player.src = audioSrc;
    player.load();
  }
}

function stopPlayback() {
  player.pause();
  vinyls.forEach(v => v.classList.remove('playing'));
  cassetteImg.src = 'img/cassette.png';
}

updatePositions();
loadCurrentTrack();

rightArrow.addEventListener('click', () => {
  positions.unshift(positions.pop());
  updatePositions();
  stopPlayback();
  loadCurrentTrack();
});

leftArrow.addEventListener('click', () => {
  positions.push(positions.shift());
  updatePositions();
  stopPlayback();
  loadCurrentTrack();
});

cassetteBtn.addEventListener('click', () => {
  const vinyl = getCenterVinyl();
  loadCurrentTrack();

  if (player.paused) {
    player.play();
    vinyl.classList.add('playing');
    cassetteImg.src = 'img/cassettepause.png'; 
  } else {
    stopPlayback();
  }
});

    player.addEventListener('ended', () => {
      stopPlayback();
    });



const progressBar = document.querySelector('.progress-bar');
const progressFill = document.querySelector('.progress-fill');
const currentTimeEl = document.querySelector('.time.current');
const durationEl = document.querySelector('.time.duration');

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

player.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(player.duration);
  currentTimeEl.textContent = '00:00';
  progressFill.style.width = '0%';
});

player.addEventListener('timeupdate', () => {
  if (!player.duration) return;

  const progress = (player.currentTime / player.duration) * 100;
  progressFill.style.width = `${progress}%`;
  currentTimeEl.textContent = formatTime(player.currentTime);
});

progressBar.addEventListener('click', (e) => {
  const rect = progressBar.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const percent = clickX / rect.width;

  player.currentTime = percent * player.duration;
});


