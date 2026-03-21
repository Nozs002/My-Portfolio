import "./home.js";
import "./taskbar.js";
import "./skills.js";
import "./utils.js";
import "./contact.js";

// thêm thuộc tính blank vào tất cả các link
const links = document.querySelectorAll(".dark-list a");
links.forEach((link) => {
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noopener noreferrer");
});

// Hiện thông báo khi gửi form
const form = document.querySelector('.apple-form');
const toast = document.getElementById('toast-notification');
const closeToastBtn = document.getElementById('close-toast');

form.addEventListener('submit', async function(event) {
  // 1. Chặn trình duyệt tự động nhảy sang trang web của Formspree
  event.preventDefault(); 
  const formData = new FormData(form);

  try {
    // 2. Âm thầm gửi dữ liệu đi bằng Fetch API
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      // 3. Nếu gửi thành công: Xóa sạch chữ trong form
      form.reset();
      // Bật Pop-up lên
      toast.classList.add('show');
      // Tự động giấu Pop-up đi sau 5 giây (5000 milliseconds)
      setTimeout(() => {
        toast.classList.remove('show');
      }, 5000);
    } else {
      alert("Oops! Có lỗi xảy ra từ máy chủ Formspree.");
    }
  } catch (error) {
    alert("Oops! Không thể gửi tin nhắn. Vui lòng kiểm tra mạng internet.");
  }
});

// Cho phép người dùng tự tắt Pop-up bằng cách bấm nút X
closeToastBtn.addEventListener('click', () => {
  toast.classList.remove('show');
});