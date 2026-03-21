import "./certificates.js";

const dots = document.querySelectorAll(".apple-dot");
const tabs = document.querySelectorAll(".tab-pane");
const playbtn = document.getElementById("playPauseBtn");
const playIcon = playbtn?.querySelector("i");
const tabControls = document.querySelector(".tab-controls");
const skillsSection = document.getElementById("Skills");

let currentIndex = 0;
let isPlaying = true;
let isSkillsVisible = false;

function updateAnimationState() {
    if (!tabControls) return;
    const state = isPlaying && isSkillsVisible ? "running" : "paused";
    tabControls.style.setProperty("--animation-state", state);
}

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

function openTabById(tabId) {
    const tabIndex = Array.from(tabs).findIndex((tab) => tab.id === tabId);
    if (tabIndex !== -1) {
        switchTab(tabIndex);
    }
}

// xu ly su kien click tren cac dot
dots.forEach((dot,index) =>{
    dot.addEventListener("click", () => {
        switchTab(index);
        if(!isPlaying){
            isPlaying = true;
            playIcon?.classList.remove("fa-play");
            playIcon?.classList.add("fa-pause");
        }
        updateAnimationState();
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
            playIcon?.classList.remove("fa-play");
            playIcon?.classList.add("fa-pause");
        }else{
            playIcon?.classList.remove("fa-pause");
            playIcon?.classList.add("fa-play");
        }
        updateAnimationState();
    });
}

window.addEventListener("openSkillsTab", (event) => {
    const tabId = event.detail?.tabId;
    if (tabId) {
        openTabById(tabId);
        updateAnimationState();
    }
});

if (skillsSection) {
    const skillsObserver = new IntersectionObserver(
        ([entry]) => {
            isSkillsVisible = entry.intersectionRatio >= 0.5;
            updateAnimationState();
        },
        { threshold: [0, 0.5, 1] }
    );
    skillsObserver.observe(skillsSection);
}

updateAnimationState();
