//Funtions wrapped in an IIFE, passed an argument of module, upon which objects can be attached for later access.
(function(module) {
//Constructor function 'Work'
  function Work (opts) {
    this.title = opts.title;
    this.category = opts.category;
    this.workUrl = opts.workUrl;
    this.imgUrl = opts.imgUrl;
    this.publishedOn = opts.publishedOn;
    this.body = opts.body;
  }

  //Method toHtml writes data from object into cloned html fragment
  Work.prototype.toHtml = function() {
    var template = Handlebars.compile($('#work-template').html());
    //Return our modified cloned DOM fragment
    return template(this);
  };

  //Take rawData and instantiate all <article>s
  Work.loadAll = function(rawData) {
    //Sort by date, newest to oldest
    rawData.sort(function(a,b) {
      return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
    });

    Work.all = rawData.map(function(ele) {
      return new Work(ele);
    });
  };

  // Retrieve data from local or remote source, process it, and hand off control to the View
  Work.fetchAll = function() {
    if (localStorage.workJSON) {
      // When rawData is already in localStorage, load it by calling the .loadAll function, then render the index page
      console.log('Retrieved work from localStorage: ', JSON.parse(localStorage.workJSON));
      //Pass to .loadAll the parsed data in local storage
      Work.loadAll(JSON.parse(localStorage.workJSON));
      //Render the index page
      workView.initIndexPage();
    } else {
      //When we don't already have the data in local storage, get it from the JSON file, simulating retrieving data on a remote server.
      // Retrieve the JSON file from the server with AJAX
      $.getJSON('js/work-data.json')
        .done(parseData)
        .fail(function() { console.log('Problem with work data!'); })
        .always(function() { console.log('Try to get JSON work data from server.');
        });

      function parseData(data){
        console.log('From AJAX, work: ', data);
        //Store the resulting JSON data with the .loadAll method
        Work.loadAll(data);
        //Cache the data in localStorage
        localStorage.workJSON = JSON.stringify(data);
        //Render the index page
        workView.initIndexPage();
      };
    }
  };
  module.Work = Work;
})(window);
