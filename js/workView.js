(function(module) {
//Create a global object to hold all of our view methods
  var workView = {};

  //Add nav bar scroll animation
  $('nav a').click(function(){
    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top
    }, 750);
    return false;
  });

  //initiate index page
  workView.initIndexPage = function(){
    console.log('Running initIndexPage work');
    Work.all.filter(function(obj) {
      return (obj.category === 'web');
    }).forEach(function(a){
      $('#web').append(a.toHtml());
    });
    Work.all.filter(function(obj) {
      return (obj.category === 'print');
    }).forEach(function(a){
      $('#print').append(a.toHtml());
    });
  };
  module.workView = workView;
})(window);
