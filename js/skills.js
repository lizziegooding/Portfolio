(function(module) {
  function Skills(opts) {
    this.skill = opts.skill;
    this.level = parseInt(opts.level);
  }

  Skills.prototype.toHtml = function() {
    this.level1 = this.level2 = this.level3 = this.level4 = this.level5 = 'black';
    if (this.level < 5) {
      this.level5 = 'white';
    }
    if (this.level < 4) {
      this.level4 = 'white';
    }
    if (this.level < 3) {
      this.level3 = 'white';
    }
    if (this.level < 2) {
      this.level2 = 'white';
    }
    // switch(this.level) {
    // default:
    //   this.level1 = this.level2 = this.level3 = this.level4 = this.level5 = 'black';
    // case 4:
    //   this.level5 = 'white';
    //   break;
    // case 3:
    //   this.level4 = this.level5 = 'white';
    //   break;
    // case 2:
    //   this.level5 = this.level4 = this.level3 = 'white';
    //   break;
    // case 1:
    //   this.level5 = this.level4 = this.level3 = this.level2 = 'white';
    //   break;
    // }
    var template = Handlebars.compile($('#skills-template').html());
    return template(this);
  };

  Skills.loadAll = function(skillsData) {
    Skills.all = skillsData.map(function(ele) {
      return new Skills(ele);
    });
  };

  Skills.fetchAll = function() {
    if (localStorage.skillsJSON) {
      console.log('Retrieved skills from localStorage', JSON.parse(localStorage.skillsJSON));
      Skills.loadAll(JSON.parse(localStorage.skillsJSON));
      skillsView.initIndexPage();
    } else {
      $.getJSON('skills-data.json')
        .done(parseData)
        .fail(function() {
          console.log('Problem with skills data!'); })
        .always(function() { console.log('Try to get JSON skills data from server.');
        });
      function parseData(data){
        console.log('From AJAX, skills: ', data);
        Skills.loadAll(data);
        localStorage.skillsJSON = JSON.stringify(data);
        skillsView.initIndexPage();
      };
    }
  };
  module.Skills = Skills;
})(window);