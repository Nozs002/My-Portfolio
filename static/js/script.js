import "./home.js";
import "./taskbar.js";
import "./tech-stack.js";
import "./utils.js";
import "./contact.js";

// BONUS: Tương tác ngược lại với Spline (Nâng cao)
// Bạn có thể lắng nghe sự kiện từ Spline Viewer nếu cần
const spline = document.querySelector("spline-viewer");
spline.addEventListener("load", (e) => {
  console.log("Scene 3D đã tải xong!");
});

const links = document.querySelectorAll(".dark-list a");

// Lặp qua từng link và thêm thuộc tính
links.forEach((link) => {
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noopener noreferrer");
});
