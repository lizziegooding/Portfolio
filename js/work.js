// SEE NOTE ON WHAT WE'RE DOING WITH WORK.ALL FROM BLOG APP: Instead of a global `articles = []` array, let's track this list of all articles directly on Work <-- the **constructor function**. Note: ".all" is NOT on the prototype. In JS, functions are objects; you can add properties to any function, at any time. In this app, we have an array of Work objects that we want to build; that array does not belong in Work.prototype since that array is "larger" than any single Work.

//Create a constructor function 'Work'
function Work (opts) {
  // Save all properties of `opts` into `this`.
  this.title = opts.title;
  this.category = opts.category;
  this.workUrl = opts.workUrl;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
}

//Declare new array works to hold work objects
Work.all = [];

//Create a new method toHtml for all article objs which writes data from object into cloned html fragment
Work.prototype.toHtml = function() {
  // console.log('prototype method called');
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  var template = Handlebars.compile($('#work-template').html());
  //Append horizontal line to end
  // $newWork
  //Return our modified cloned DOM fragment
  return template(this);
};

// DONE: This function will take the rawData, how ever it is provided, and use it to instantiate all the articles. This code is moved from elsewhere, and encapsulated in a simply-named function for clarity.
Work.loadAll = function(rawData) {
  //Sort by date, youngest to oldest
  rawData.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  rawData.forEach(function(ele) {
    Work.all.push(new Work(ele));
  });
};

// This function will retrieve the data from either a local or remote source, and process it, then hand off control to the View.
Work.fetchAll = function() {
  if (localStorage.dataJSON) {
    // When rawData is already in localStorage, we can load it by calling the .loadAll function, and then render the index page (using the proper method on the workView object).
    console.log('Retrieved from localStorage: ', JSON.parse(localStorage.dataJSON));
    //DONE: What do we pass in here to the .loadAll function?
    Work.loadAll(JSON.parse(localStorage.dataJSON));
    //DONE: Change this fake method call to the correct one that will render the index page.
    workView.initIndexPage();
  } else {
    // DONE: When we don't already have the rawData in local storage, we need to get it from the JSON file, which simulates data on a remote server. Run live-server or pushstate-server! Please do NOT browse to your HTML file(s) using a "file:///" link. RUN A SERVER INSTEAD!!
    // 1. Retrieve the JSON file from the server with AJAX (which jQuery method is best for this?),
    $.getJSON('myWork.json')
      .done(parseData)
      .fail(function() { console.log('Problem with data!'); })
      .always(function() { console.log('Try to get JSON data from server.');
      });

    function parseData(data){
      console.log('From AJAX: ', data);
      // 2. Store the resulting JSON data with the .loadAll method,
      Work.loadAll(data);
      // 3. Cache the data in localStorage so next time we won't enter this "else" block (avoids hitting the server),
      localStorage.dataJSON = JSON.stringify(data);
      // 4. Render the index page (perhaps with an workView method?).
      workView.initIndexPage();
    };
  }
};