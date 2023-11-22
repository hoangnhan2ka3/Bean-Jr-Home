var splide = new Splide( '.splide',{
   padding: '12px',
   gap    : '12px',
   autoplay: true,
   lazyLoad: 'nearby',
   type: 'loop',
   breakpoints: {
      1087: {
         padding: '24px',
         gap: '24px',
       },
      769: {
         padding: '0px',
         arrows: false,
      },
    },
} );
splide.mount();

window.addEventListener("scroll", function(){
   const navBgs = document.querySelectorAll(".nav-bg");
   navBgs.forEach(function(navBg) {
      navBg.classList.toggle("fixed", window.scrollY > 0);
   });
});

window.addEventListener("scroll", function(){
   const sections = Array.from(document.querySelectorAll(".section"));
   const menuScrolls = document.querySelectorAll(".menu-scroll");

   // Xóa lớp "active" khỏi tất cả các thẻ
   menuScrolls.forEach(function(menuScroll) {
      menuScroll.classList.remove('active');
   });

   // Nếu người dùng đang ở đầu trang, thêm lớp "active" vào liên kết "Trang chủ"
   if (window.scrollY === 0) {
      const homeLink = document.querySelector('.home-link');
      homeLink.classList.add('active');
      return;
   }

   let maxVisible = 0;
   let mostVisibleSection = null;

   for (let section of sections) {
      const rect = section.getBoundingClientRect();
      const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      if (visibleHeight > maxVisible) {
         maxVisible = visibleHeight;
         mostVisibleSection = section;
      }
   }

   if (mostVisibleSection) {
      const id = mostVisibleSection.getAttribute('id');
      const link = document.querySelector(`.menu-scroll[href="#${id}"]`);
      if (link) {
         link.classList.add('active');
      }
   }
});

window.onload = function() {
   if(window.location.href !== "https://hoangnhan2ka3.github.io/Bean-Jr-Home/") {
      window.location.href = "https://hoangnhan2ka3.github.io/Bean-Jr-Home/";
   }

   const homeLink = document.querySelector('.home-link');
   homeLink.classList.add('active');
}


// Hàm để ẩn đi phần tử có id là "preloader" với hiệu ứng ease
function hidePreloader() {
   var preloader = document.getElementById("preloader");
   preloader.style.opacity = '0'; // Đặt opacity thành 0 để ẩn preloader
}

// Biến kiểm soát xem sự kiện "load" đã xảy ra chưa
var isPageLoaded = false;

// Thêm sự kiện "load" vào window
window.addEventListener("load", function() {
   isPageLoaded = true;
   hidePreloader(); // Gọi hàm để ẩn preloader khi trang web đã tải xong
});

// Đặt một đồng hồ đếm thời gian, sau 5 giây, ẩn đi preloader nếu trang chưa tải xong
var timeoutID = setTimeout(function() {
   if (!isPageLoaded) {
       hidePreloader();
   }
}, 5000);

// Thêm sự kiện "readystatechange" để kiểm tra trạng thái tải của trang
document.addEventListener("readystatechange", function() {
   // Nếu trạng thái tải của trang là "complete", hủy bỏ đồng hồ đếm thời gian và ẩn preloader
   if (document.readyState === "complete") {
       clearTimeout(timeoutID);
       hidePreloader();
   }
});


