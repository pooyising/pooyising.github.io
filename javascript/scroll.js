$(document).ready(function() {
  var scrollLink = $('.scroll');

  // Smooth scrolling
  scrollLink.click(function(event) {
    event.preventDefault(); // preventing the default action of the links jumping to the section of the single page.
    $('body, html').animate({
      scrollTop: $(this.hash).offset().top       //normally is Css-property but here we use ScrollTop, which is a function that looks at the location(how far up/down) of the scrollbar; add a "-20" behind if it is not responding as intended.
    }, 3000) // animate looks for CSS properties. the 1st argument is the property, 2nd is duration(in ms), In this case, we can use scrollTop instead of the CSS property.
  });

  // // Active link switching
  // $(window).scroll(function() {
  //   var scrollbarLocation = $(this).scrollTop();   // test using console.log(scrollBbarLocation)

  //   scrollLink.each(function() {

  //     var sectionOffset = $(this.hash).offset().top; // calculate how far away from the top of the page is each section

  //     if (sectionOffset <= scrollbarLocation) {
  //       $(this).addClass('active');
  //       $(this).siblings().removeClass('active');
  //       $(this).parent().addClass('active');   // if the Bootstrap "active" class is not on the <a> tag itself but a parent of it.
  //       $(this).parent().siblings().removeClass('active');   // if the Bootstrap "active" class is not on the <a> tag itself but a parent of it.
  //     }

  //   })

  // })


})
