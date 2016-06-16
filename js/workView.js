//Create a global object to hold all of our view methods
var workView = {};

workView.changeNav = function(){
  console.log('changedNav');
  //Add event listener to the nav bar, 'click'
  $('nav ul li').on('click', function(){
    //Hide all sections
    $('section').hide();
    //Fade in clicked section where data-content attribute matches section id
    $('#' + $(this).attr('data-content')).fadeIn();
  });
};

//Call the function once te page has loaded
$(function() {
  workView.changeNav();
});
