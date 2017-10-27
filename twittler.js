$(document).ready(function(){
    $('#refresh').on('click', function(event) {
      event.stopPropagation();
      event.preventDefault();
      loadMoreTwitts();
    });
});

function loadMoreTwitts() {
  var $body = $('body');
  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message);
    $tweet.appendTo($body);
    index -= 1;
  }
}