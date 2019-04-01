var animals = ['cat', 'dog', 'red panda', 'squirrel', 'whale', 'dolphin', 'raccoon', 'penguin', 'duck', 'gorilla', 'lion'];

function displayWikiInfo() {
  var searchTerm = $(this).attr('data-name');
  // Ran into issues with CORS. Got help from tutor (Lindsey Bowen) about finding a public GitHub account that had a shortcut to bypass the needs in order to display 
  var cors = 'https://cors-anywhere.herokuapp.com/'
  var queryURL = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + searchTerm + '&format=json';

  $.ajax({
    url: cors + queryURL,
    method: 'GET'
  }).then(function (response) {
    console.log(response);
    var results = response[2][0];
    var link = response[3][0];

    var wikiHead = $("<div class='wiki-head'>")
    var wikiDiv = $("<div class='wiki'>");
    var wikiLink = $("<br><br><a class='link-text' href=" + link + ">" + 'Learn more about the ' + searchTerm + "</a>");

    wikiHead.text('Fun fact about the ' + searchTerm + ':').css({'font-family': "'Indie Flower', cursive"});

    wikiHead.append(wikiDiv);
    wikiDiv.append(results);
    // wikiLink.html(wikiLink);

    $('#wikipedia-text').prepend(wikiHead);
    wikiDiv.append(wikiLink);
  })
};

function displayGifInfo() {
  var gif = $(this).attr('data-name');
  var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + gif + '&api_key=pDw3ye2yHiWPwWzvr4ruP8qT3pUuCrTq&limit=10';


  // AJAX Request for GIPHY.COM
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function (response) {
    var results = response.data;

    for (i = 0; i < results.length; i++) {
      console.log('log');
      var animalDiv = $("<div class='animal'>");

      var title = results[i].title;
      var pOne = $('<p>').text('Title: ' + "'" + title + "'");
      pOne.attr('id', 'title-text');
      animalDiv.append(pOne);

      var rating = results[i].rating.toUpperCase();
      var pTwo = $('<p>').text('Rating: ' + '(' + rating + ')');
      pTwo.attr('id', 'rating-text');
      animalDiv.append(pTwo);

      var gifs = $("<img class='gif border border-danger'>");
      gifs.attr('src', results[i].images.fixed_height_still.url);
      gifs.attr('data-still', results[i].images.fixed_height_still.url);
      gifs.attr('data-animate', results[i].images.fixed_height.url);
      gifs.attr('data-state', 'still');
      animalDiv.append(gifs);

      // Download Button
      var sourceLink = $('<a>');
      var $br = $('<br>');
      sourceLink.attr('href', results[i].images.original.url);
      sourceLink.attr('id', 'source');
      sourceLink.text('VIEW ORIGINAL SOURCE');

      $('#gif-images').prepend(animalDiv);
      $(animalDiv).append($br, sourceLink);
      // $(animalDiv).append(sourceLink);
    }
  });
};



// // When the user scrolls the page, execute myFunction 
window.onscroll = function () { stickyHeader() };

var header = $('#myHeader');
var sticky = header.offsetTop;

var savedValue;

// // Added the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickyHeader() {
  if (window.pageYOffset > sticky) {
    header.addClass("sticky");
  } else {
    header.removeClass("sticky");
  }
};


// Function to render buttons at beginning and adding to array
function renderButtons() {
  $('#gif-view').empty();

  for (i = 0; i < animals.length; i++) {
    var t = $('<button>');
    t.addClass('animal-btn');
    t.attr('data-name', animals[i]);
    t.text(animals[i]);
    t.val(animals[i]);
    $('#gif-view').append(t);

  }
};

$('#add-gif').on('click', function (event) {
  event.preventDefault();
  var newGif = $('#gif-input').val().trim();
  animals.push(newGif);
  renderButtons();
  $('#gif-input').val('');
});

function clearOffset() {
  offset = 10;
  console.log('offset: ' + offset);
}

function clearContent() {
  $('#gif-images').empty();
  $('#wikipedia-text').empty();
}

// Clear Images
$('#clear').on('click', function () {
  clearContent();
  clearOffset();
});

  var offset = 10;

// ADD MORE GIFS
$('#more-gifs').on('click', function () {
  event.preventDefault();

  var gif = $(this).attr('data-name');
  var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + savedValue + '&api_key=pDw3ye2yHiWPwWzvr4ruP8qT3pUuCrTq&limit=10&offset=' + offset;

  offset+=10;
  console.log('offset: ' + offset);

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function (response) {
    var results = response.data;

    for (i = 0; i < results.length; i++) {
      console.log('log');
      var animalDiv = $("<div class='animal'>");

      var title = results[i].title;
      var pOne = $('<p>').text('Title: ' + "'" + title + "'");
      pOne.attr('id', 'title-text');
      animalDiv.append(pOne);

      var rating = results[i].rating.toUpperCase();
      var pTwo = $('<p>').text('Rating: ' + '(' + rating + ')');
      pTwo.attr('id', 'rating-text');
      animalDiv.append(pTwo);

      var gifs = $("<img class='gif border border-danger'>");
      gifs.attr('src', results[i].images.fixed_height_still.url);
      gifs.attr('data-still', results[i].images.fixed_height_still.url);
      gifs.attr('data-animate', results[i].images.fixed_height.url);
      gifs.attr('data-state', 'still');
      animalDiv.append(gifs);

      // Download Button
      var sourceLink = $('<br><a>');
      var $br = $('<br>');
      sourceLink.attr('href', results[i].images.original.url);
      sourceLink.attr('id', 'source');
      sourceLink.text('VIEW ORIGINAL SOURCE');

      $('#gif-images').append(animalDiv);
      $(animalDiv).append($br, sourceLink);
      sourceLink.text('VIEW ORIGINAL SOURCE');

    }
  });

    
  });



$(document).on('click', '.animal-btn', clearContent);
$(document).on('click', '.animal-btn', displayGifInfo);
$(document).on('click', '.animal-btn', displayWikiInfo);
$(document).on('click', '.animal-btn', clearOffset);
$(document).on('click', '.animal-btn', function() {
  savedValue = $(this).val();
  console.log(savedValue);
} );

$(document).on('click', '.gif', function () {
  var state = $(this).attr('data-state');

  if (state === 'still') {
    $(this).attr('data-state', 'animate');
    $(this).attr('src', $(this).attr('data-animate'));
  } else {
    $(this).attr('data-state', 'still');
    $(this).attr('src', $(this).attr('data-still'));
  }
});

renderButtons();
