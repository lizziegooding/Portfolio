// Wrap the entire contents of this file in an IIFE.
// Pass in to the IIFE a module, upon which objects can be attached for later access.
(function(module) {
//Create a global object to hold all of our view methods
  var workView = {};

  workView.changeNav = function(){
    console.log('Running changedNav');
    //Add event listener to the nav bar, 'click'
    $('nav ul li').on('click', function(){
      //Hide all sections
      $('section').hide();
      //Fade in clicked section where data-content attribute matches section id
      $('#' + $(this).attr('data-content')).fadeIn();
    });
  };

  workView.initIndexPage = function(){
    console.log('Running initIndexPage work');
    Work.all.forEach(function(a){
      $('#work div.container').append(a.toHtml());
    });

    workView.changeNav();
  };
  module.workView = workView;
})(window);
