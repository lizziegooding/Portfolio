//Declare new array works to hold work objects
var work = [];

//Create a constructor function 'Article'
function Article (opts) {
  // Save all properties of `opts` into `this`.
  this.title = opts.title;
  this.category = opts.category;
  this.workUrl = opts.workUrl;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
}

//Create a new method toHtml for all article objs which writes data from object into cloned html fragment
Article.prototype.toHtml = function() {
  //Clones works and all descendants within HTML
  var $newArticle = $('article.template').clone();

  // Remove class template from our new clone
  $newArticle.removeClass('template');

  //Fill in: the work and url, the article title and body, and the publication date.
  $newArticle.find('h1').text(this.title);
  $newArticle.find('a').attr('href', this.workUrl);
  $newArticle.find('section.article-body').html(this.body);
  //Include the publication date as a 'title' attribute to show on hover:
  $newArticle.find('time[pubdate]').attr('title', this.publishedOn);

  // Display the date as a relative number of "days ago":
  $newArticle.find('time').text('about ' + parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000) + ' days ago');

  //Append horizontal line to end
  $newArticle.append('<hr>');
  //Return our modified cloned DOM fragment
  return $newArticle;
};

//Sort array based on publication date
rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(ele) {
  work.push(new Article(ele));
});

work.forEach(function(a){
  $('#work').append(a.toHtml());
});
