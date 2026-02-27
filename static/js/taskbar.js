//  thiết kế thành điều hướng taskbar

const list = document.querySelectorAll(".button_menu_taskbar");
const indicator = document.querySelector(".menu-indicator");

// Hàm di chuyển viên thuốc đến vị trí nút mục tiêu
function moveIndicator(targetBtn) {
  if (!targetBtn) return;

  const left = targetBtn.offsetLeft;
  const width = targetBtn.offsetWidth;
  indicator.style.left = `${left}px`;
  indicator.style.width = `${width}px`;
}

list.forEach((item) => {
  item.addEventListener("click", (e) => {
    list.forEach((btn) => btn.classList.remove("active"));
    e.currentTarget.classList.add("active");
    moveIndicator(e.currentTarget);
  });
});

const activeDefault = document.querySelector(".button_menu_taskbar.active");
setTimeout(() => {
  moveIndicator(activeDefault);
}, 100);

const buttons = document.querySelectorAll(".button_menu_taskbar");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", (e) => {
  let currentSection = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.pageYOffset >= sectionTop - 150) {
      currentSection = section.getAttribute("id");
    }
  });

  buttons.forEach((button) => {
    button.classList.remove("active");

    if (button.getAttribute("href").includes(currentSection)) {
      moveIndicator(button);
    }
  });
});

// thiet ke hop nhac
const musicBox = document.getElementById("musicBox");
const audio = document.getElementById("audioPlayer");
const playIcon = document.getElementById("playIcon");
const diskImg = document.getElementById("diskImg");
const progressBar = document.getElementById("progressbar");
const progressContainer = document.getElementById("progress-container");

function xuLyThuNho() {
  musicBox.classList.toggle("minimized");
}

if (toggleBtn) {
  toggleBtn.addEventListener("click", xuLyThuNho);
}

if (minimizedView) {
  minimizedView.addEventListener("click", xuLyThuNho);
}

function playPauseMusic() {
  if (audio.paused) {
    audio.play();
    playIcon.classList.remove("fa-play");
    playIcon.classList.add("fa-pause");

    musicBox.classList.add("playing");
  } else {
    audio.pause();
    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");

    musicBox.classList.remove("playing");
  }
}

if(audio){
audio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;

  const progressPercent = (currentTime / duration) * 100;

  progressBar.style.width = `${progressPercent}%`;
});
}

if(progressContainer){
progressContainer.addEventListener("click", (e) => {
  const progressWidth = progressContainer.clientWidth;
  const clickX = e.offsetX;

  const duration = audio.duration;
  audio.currentTime = (clickX / progressWidth) * duration;
});
}

audio.addEventListener("ended", (e) => {
  progressBar.style.width = "0%";
  playIcon.classList.remove("fa-pause");
  playIcon.classList.add("fa-play");
  musicBox.classList.remove("playing");
});