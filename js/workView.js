//Create a global object to hold all of our view methods
var workView = {};

workView.changeNav = function(){
  console.log('changedNav');
  //Add event listener to the nav bar, 'click'
  $('nav ul li').on('click', function(){
    //Hide all sections
    $('section').hide();
    $('#' + $(this).attr('data-content')).fadeIn();
  });
};

$(document).ready(function() {
  workView.changeNav();
});
