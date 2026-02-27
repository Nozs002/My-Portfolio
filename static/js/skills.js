const dots = document.querySelectorAll(".apple-dot");
const tabs = document.querySelectorAll(".tab-pane");
const playbtn = document.getElementById("playPauseBtn");
const playIcon = playbtn.querySelector("i");
const tabControls = document.querySelector(".tab-controls");

let currentIndex = 0;
let isPlaying = true;

function switchTab(index) {
    dots.forEach((dot) => {
        dot.classList.remove("active");

        const progress = dot.querySelector(".progress");
        progress.style.animation = "none";
        progress.offsetHeight; // Trigger reflow để reset animation
        progress.style.animation = ""; 
    });

    tabs.forEach((tab) => tab.classList.remove("active"));

    dots[index].classList.add("active");
    if(tabs[index]){
        tabs[index].classList.add("active");
    }

    currentIndex = index;
}

// xu ly su kien click tren cac dot
dots.forEach((dot,index) =>{
    dot.addEventListener("click", () => {
        switchTab(index);
        tabControls.style.setProperty("--animation-state", "running");
        if(!isPlaying){
            isPlaying = true;
            playIcon.classList.remove("fa-play");
            playIcon.classList.add("fa-pause");
        }
    });

    const progress = dot.querySelector(".progress");
    progress.addEventListener("animationend", () =>{
        if(dot.classList.contains("active")){
            let newIndex = (currentIndex +1) % dots.length;
            switchTab(newIndex);
        }
    });
});

//  xu ly nut play/pause
if(playbtn){
    playbtn.addEventListener("click", () => {
        isPlaying = !isPlaying;

        if(isPlaying){
            playIcon.classList.remove("fa-play");
            playIcon.classList.add("fa-pause");
            tabControls.style.setProperty("--animation-state", "running");
        }else{
            playIcon.classList.remove("fa-pause");
            playIcon.classList.add("fa-play");
            tabControls.style.setProperty("--animation-state", "paused");
        }
    });
}
