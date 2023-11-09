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



