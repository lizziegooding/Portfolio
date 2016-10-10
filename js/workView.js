(function(module) {
//Create a global object to hold all of our view methods
  var workView = {};

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
