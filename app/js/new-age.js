(function ($) {
  "use strict" // Start of use strict

  // jQuery for page scrolling feature - requires jQuery Easing plugin
  $('a.page-scroll').bind('click', function (event) {
    try {
      var $anchor = $(this)
      $('html, body').stop().animate({
        scrollTop: ($($anchor.attr('href')).offset().top - 50)
      }, 300, 'easeInOutExpo')
      event.preventDefault()
    } catch (err) {

    }
  })

  // Highlight the top nav as scrolling occurs
  $('body').scrollspy({
    target: '.navbar-fixed-top',
    offset: 100
  })

  // Closes the Responsive Menu on Menu Item Click
  $('.navbar-collapse ul li a').click(function () {
    $('.navbar-toggle:visible').click()
  })

  // Offset for Main Navigation
  $('#mainNav').affix({
    offset: {
      top: 50
    }
  })

  particlesJS.load('eloyt-intro-particles', 'data/particlesjs-config.json')
  particlesJS.load('eloyt-download-particles', 'data/particlesjs-config.json')
})(jQuery) // End of use strict
