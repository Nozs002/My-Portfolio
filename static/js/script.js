document.addEventListener("DOMContentLoaded", () => {
  fetchProjects();
});

// Hàm gọi API từ FastAPI
async function fetchProjects() {
  try {
    // Gọi vào endpoint chúng ta đã viết trong main.py
    const response = await fetch("/api/projects");
    const projects = await response.json();

    renderProjects(projects);
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
  }
}

// Hàm hiển thị dữ liệu lên HTML
function renderProjects(data) {
  const list = document.getElementById("project-list");

  data.forEach((project) => {
    const card = document.createElement("div");
    card.classList.add("project-card");

    card.innerHTML = `
            <h3>${project.title}</h3>
            <small>${project.tech}</small>
            <p>${project.desc}</p>
        `;

    list.appendChild(card);
  });
}

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
