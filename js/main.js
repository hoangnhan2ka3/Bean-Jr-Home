var splide = new Splide( '.splide',{
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

// Sự kiện beforeunload để chuyển hướng trước khi unload trang
window.addEventListener('beforeunload', function () {
   if (window.location.href !== window.location.origin) {
       window.location.href = window.location.origin;
   }
});

// Sự kiện onload để cuộn lên đầu trang khi trang đã được load
window.onload = function () {
   window.scrollTo(0, 0);

   // Xóa hash khi trang đã load
   if (window.location.hash) {
       history.replaceState(null, null, ' ');
   }
}

// Hàm để ẩn đi phần tử có id là "preloader" hoàn toàn
function hidePreloader() {
   var preloader = document.getElementById("preloader");
   preloader.classList.add("hidden");
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
}, 12000);

// Thêm sự kiện "readystatechange" để kiểm tra trạng thái tải của trang
document.addEventListener("readystatechange", function() {
   // Nếu trạng thái tải của trang là "complete", hủy bỏ đồng hồ đếm thời gian và ẩn preloader
   if (document.readyState === "complete") {
       clearTimeout(timeoutID);
       hidePreloader();
   }
});