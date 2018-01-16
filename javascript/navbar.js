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
