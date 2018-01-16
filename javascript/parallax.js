$(window).scroll(function() {
  parallax();
})

function parallax() {

  var wScroll = $(window).scrollTop();
  // console.log(wScroll)
  $('.parallax--bg').css('background-position', 'center ' + (wScroll * 0.05 ) + 'px')
  // $('.parallax--bg').css('bottom', (wScroll * 0.005) + 'em')

}
