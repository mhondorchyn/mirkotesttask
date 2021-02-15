$(document).ready(function(){
    $('.js-main-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: false,
        asNavFor: '.js-main-slider-nav'
      });
      $('.js-main-slider-nav').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.js-main-slider',
        arrows: false,
        focusOnSelect: true,
        mobileFirst: true,
        responsive: [
            {
              breakpoint: 767,
              settings: {
                vertical: true
              }
            },
          ]
      });
  });



