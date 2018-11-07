$(document).ready(function(){
  
  //begin slider
  $('.slick-slider').slick({
    arrows: false,
    appendDots: $('.slider__nav'),
    dots: true,
    dotsClass: 'slider__dots',
    customPaging : function(slider, i) {
      console.log(slider);
      return '<span class="slider__dot"></span>';
    }
  });
  //end slider
  //begin ya.maps
  ymaps.ready(init);
  var myMap,
      myPlacemark;
  
  function init(){
    myMap = new ymaps.Map("map", {
      center: [37.7022,-122.4878],
      zoom: 12
    },{
      autoFitToViewport: false
    });
  
    myPlacemark = new ymaps.Placemark([37.6906,-122.4855], {
      balloonContentHeader: '<b>Наш адрес</b>',
      balloonContentBody: '3-й гараж от пляжа'
    }, {
      iconLayout: 'default#image',
      iconImageHref: 'img/general/marker.png',
      iconImageSize: [50, 70]
    });
  
    window.onresize = function(e) {
      myMap.container._element.style.width = '100%';
      myMap.container.getElement().style.width = '100%';
      myMap.container.fitToViewport();
    };
  
    myMap.geoObjects.add(myPlacemark);
  }
  //end ya.maps
});