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
const introAudio = document.getElementById("introPlayer");
const playIcon = document.getElementById("playIcon");
const diskImg = document.getElementById("diskImg");
const progressBar = document.querySelector(".progress-bar"); // Chỉnh lại cho đúng class trong CSS
const progressContainer = document.querySelector(".progress-container");
const toggleBtn = document.getElementById("toggleBtn");
const minimizedView = document.getElementById("minimizedView");

function xuLyThuNho() {
  musicBox.classList.toggle("minimized");
}

if (toggleBtn) {
  toggleBtn.addEventListener("click", xuLyThuNho);
}

if (minimizedView) {
  minimizedView.addEventListener("click", xuLyThuNho);
}

// Xuất hàm ra global để HTML có thể gọi được (do dùng type="module")
window.playPauseMusic = function() {
  if (audio.paused) {
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise.then(() => {
        // Nhạc bắt đầu phát thành công
        playIcon.classList.remove("fa-play");
        playIcon.classList.add("fa-pause");
        musicBox.classList.add("playing");
      }).catch(error => {
        // Trình duyệt chặn hoặc lỗi file
        console.error("Không thể phát nhạc:", error);
        alert("Vui lòng nhấn vào trang web một lần để kích hoạt quyền phát âm thanh!");
      });
    }
  } else {
    audio.pause();
    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");
    musicBox.classList.remove("playing");
  }
};

// Tự động "mở khóa" âm thanh khi người dùng click lần đầu vào trang
document.addEventListener('click', () => {
  if (audio.paused && !musicBox.classList.contains('playing')) {
    // Chỉ nạp trước dữ liệu chứ chưa phát để tránh làm phiền
    audio.load(); 
  }
}, { once: true });

window.toggleMusicBox = xuLyThuNho;

if (audio) {
  audio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    if (duration) {
      const progressPercent = (currentTime / duration) * 100;
      progressBar.style.width = `${progressPercent}%`;
    }
  });
}

if (progressContainer) {
  progressContainer.addEventListener("click", (e) => {
    const progressWidth = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    if (duration) {
      audio.currentTime = (clickX / progressWidth) * duration;
    }
  });
}

if (audio) {
  audio.addEventListener("ended", (e) => {
    progressBar.style.width = "0%";
    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");
    musicBox.classList.remove("playing");
  });
}

const enterBtn = document.getElementById('enter-btn');
if (enterBtn) {
  enterBtn.addEventListener('click', () => {
    const splash = document.getElementById('splash-screen');
    if (splash) splash.classList.add('hidden');
    
    // 1. Chuyển cảnh taskbar và home content
    const menuTaskbar = document.querySelector('.menu_taskbar');
    const homeContent = document.querySelector('.home-content');
    
    setTimeout(() => {
      if (menuTaskbar) menuTaskbar.classList.add('expanded');
      if (homeContent) {
        homeContent.classList.add('reveal');
        // Sau khi hiện content thì bắt đầu gõ chữ
        startTypingEffect();
      }
    }, 500); // Đợi splash screen bắt đầu mờ đi

    // 2. Phát intro sound duy nhất 1 lần
    if (introAudio) {
      introAudio.play().catch(e => {
        console.error("Intro sound failed:", e);
        // Nếu intro lỗi, phát nhạc nền ngay lập tức để không bị im lặng
        playMainBackgroundMusic();
      });

      // 2. Đợi intro kết thúc mới phát nhạc nền chính
      introAudio.onended = () => {
        playMainBackgroundMusic();
      };
    } else {
      // Nếu không có file intro, phát nhạc nền ngay
      playMainBackgroundMusic();
    }
  });
}

// Hàm bổ trợ để phát nhạc nền chính và cập nhật UI với hiệu ứng Fade In
function playMainBackgroundMusic() {
  const audio = document.getElementById("audioPlayer");
  const playIcon = document.getElementById("playIcon");
  const musicBox = document.getElementById("musicBox");

  if (audio && audio.paused) {
    // 1. Khởi tạo âm lượng bằng 0
    audio.volume = 0;
    
    audio.play().then(() => {
      // 2. Hiệu ứng Fade In (tăng dần âm lượng lên 1 trong 2 giây)
      let volume = 0;
      const fadeInterval = setInterval(() => {
        if (volume < 1) {
          volume += 0.05; // Tăng mỗi lần 5%
          if (volume > 1) volume = 1;
          audio.volume = volume;
        } else {
          clearInterval(fadeInterval);
        }
      }, 100); // Mỗi 100ms tăng 1 lần (tổng cộng 20 lần ~ 2 giây)
    }).catch(e => console.error("Autoplay failed:", e));

    if (playIcon) {
      playIcon.classList.remove("fa-play");
      playIcon.classList.add("fa-pause");
    }
    if (musicBox) musicBox.classList.add("playing");
  }
}

// Hàm gõ chữ dạng máy tính lặp đi lặp lại
function startTypingEffect() {
  const typingElement = document.querySelector(".typing-text");
  if (!typingElement) return;

  const text = typingElement.getAttribute("data-text") || "Nozs002";
  let index = 0;
  let isDeleting = false;
  let typeSpeed = 150;

  function type() {
    const currentText = isDeleting 
      ? text.substring(0, index - 1) 
      : text.substring(0, index + 1);

    typingElement.textContent = currentText;

    if (!isDeleting && currentText === text) {
      // Đã gõ xong, đợi một lát rồi xóa
      isDeleting = true;
      typeSpeed = 1500; // Đợi 1.5s
    } else if (isDeleting && currentText === "") {
      // Đã xóa xong, bắt đầu gõ lại
      isDeleting = false;
      typeSpeed = 500;
      index = 0;
    } else {
      typeSpeed = isDeleting ? 100 : 150;
      index = isDeleting ? index - 1 : index + 1;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}