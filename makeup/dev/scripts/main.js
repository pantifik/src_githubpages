$('.owl-carousel').owlCarousel({
  margin:15,
  loop:true,
  dots: false,
  navContainerClass: 'slider__nav',
  navClass:['prev', 'next'],
  responsive: {
    0: {
      items: 1,
      dots: true,
      nav: false
    },
    500: {
      items: 1,
      dots: true,
      nav: false
    },
    700: {
      items: 2,
      dots: true,
      nav: false
    },
    1000: {
      items: 3,
      nav: true
    }
  }
})