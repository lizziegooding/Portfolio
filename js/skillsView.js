// Entire contents of this file wrapped in IIFE. Passed in to the IIFE a module, upon which objects can be attached for later access.
(function(module) {
//Global object to hold view methods
  var skillsView = {};

  skillsView.initIndexPage = function(){
    console.log('Running initIndexPage skills');
    Skills.all.forEach(function(a){
      $('#tech').append(a.toHtml());
    });
  };
  module.skillsView = skillsView;
})(window);
