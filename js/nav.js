$('#nav-icon2').click(function(){
  $(this).toggleClass('open');
  $('#overlay').toggle();
});

// Add nav bar scroll animation
$('#overlay a').click(function(){
  $('html, body').animate({
    scrollTop: $($(this).attr('href')).offset().top
  }, 750);
  $('#nav-icon2').click();
  return false;
});
