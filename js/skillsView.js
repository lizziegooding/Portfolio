// Wrap the entire contents of this file in an IIFE.
// Pass in to the IIFE a module, upon which objects can be attached for later access.
(function(module) {
//Create a global object to hold all of our view methods
  var skillsView = {};

  skillsView.initIndexPage = function(){
    console.log('Running initIndexPage skills');
    Skills.all.forEach(function(a){
      $('#tech').append(a.toHtml());
    });

    // workView.changeNav();
  };
  module.skillsView = skillsView;
})(window);
