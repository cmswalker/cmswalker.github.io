$(document).ready(function() {
  $('#fullpage').fullpage({
    onSlideLeave: function() {console.log('go')}
  });
  $('#fullpage').scroll(function() {
      console.log('scrollin');
      $('#sidebar').animate({top:$(this).scrollTop()});
  });
});
