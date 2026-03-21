const certList = document.querySelector(".dark-list");

if(certList){
    certList.addEventListener("wheel", (e) => {
        e.preventDefault();
        const speed = 2.5;
        certList.scrollLeft += e.deltaY*speed;
    });
}