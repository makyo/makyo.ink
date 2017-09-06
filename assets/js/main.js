function invert() {
  if (document.body.classList.contains('invert')) {
    document.body.classList.remove('invert');
    document.cookie = "inverse=false;path=/";
  } else {
    document.body.classList.add('invert');
    document.cookie = "inverse=true;path=/";
  }
}

$(document).ready(function() {

  // Menu Settings
  $('.menu-icon, .menu-icon-close').click(function(e) {
    e.preventDefault();
    $('.flex-container').toggleClass('active');
  });

  // Search Settings
  $('.search-icon').on('click', function(e){
    e.preventDefault();
    $('.search-box').toggleClass('search-active');

    if ($('.search-box').hasClass('search-active')) {
      $('.search-icon-close').on('click', function(e){
  		e.preventDefault();
  		$('.search-box').removeClass('search-active');
  	});
  }
  });



  if (document.cookie.indexOf('inverse=true') >= 0) {
    invert();
  }
});
