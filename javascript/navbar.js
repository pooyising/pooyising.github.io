$(document).ready(function() {
  // hamburger menu toggle
  $('.nav-toggle').click(function() {
    $('.main-nav').toggleClass('is-open');
    $('.hamburger').toggleClass('is-open');
  });

  $('.scroll').click(function() {
    $('.main-nav').removeClass('is-open');  // rmb 'is-open' is a class we created and defined in the CSS.
    $('.hamburger').removeClass('is-open');
  });
  // $('.nav-toggle').click(function() {
  //   $('div.hamburger.is-open').css("background", "red");
  //   $('div.hamburger.is-open::after').css("background", "red");
  // })
  // $('a.active').click(function() {
  //   $(this).addClass('is-highlighted');
  // })

})


// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("nav");


// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}
