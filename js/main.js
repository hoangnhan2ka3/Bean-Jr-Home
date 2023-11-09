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
}

window.onload = function() {
   const homeLink = document.querySelector('.home-link');
   homeLink.classList.add('active');
}