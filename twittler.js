$(document).ready(function(){
    $('#refresh').on('click', function(event) {
      event.stopPropagation();
      event.preventDefault();
      loadTwitts(false);
    });
});

function loadMoreTwitts() {
  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    displayTwitt(formatTwitt(tweet));
    index -= 1;
  }
}

function formatTwitt(twitt) {
  var formattedTwitt = '<li>';
  formattedTwitt += '<span class=\"handle\">@' + twitt.user + '</span>';
  formattedTwitt += ': ';
  formattedTwitt += '<span class=\"content\">' + twitt.message + '</span>';
  formattedTwitt += ' at ';
  formattedTwitt += '<span class=\"time\">' + twitt.created_at + '</span>';
  formattedTwitt += '</li>';
  return formattedTwitt;
}

function displayTwitt(twittStr) {
  var $body = $('#feed').find('.twitts');
  var $twitt = $(twittStr);
  $twitt.appendTo($body);
}

function loadTwitts(user, username) {
  if (!user) {
    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      displayTwitt(formatTwitt(tweet));
      index -= 1;
    }
  }
}