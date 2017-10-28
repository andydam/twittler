//used for temp memory when switching from feed to user profile
var sessionData = {
  'profile' : {
    'name' : false,
    'lastIndex' : 0
  },
  'stream' : {
    'lastIndex' : 0
  },
  'autoload' : false
};

$(document).ready(function(){
  //inital feed load
  loadTwitts(sessionData.profile.name);

  //load new twitts when load more button pressed
  $('#feed').on('click', '.refresh',function(event) {
    event.preventDefault();
    loadTwitts(sessionData.profile.name);
  });

  //toggle autoloading when autoload button pressed
  $('#feed').on('click', '.autoload', function(event) {
    event.preventDefault();
    if (sessionData.autoload) {
      sessionData.autoload = false;
      $('#feed').find('.autoload').text('Autoload OFF');
    } else {
      sessionData.autoload = true;
      $('#feed').find('.autoload').text('Autoload ON');
      scheduleRefresh();
    }
  });

  //toggle display of post form
  $('#feed').on('click', '.showpost',function(event) {
    event.preventDefault();
    $('#post').slideToggle();
  });

  //post twitt
  $('#post').on('click', '.submit',function(event) {
    writeTweet($('input').val(), $('textarea').val());

    //after sending twitt clear out and hide form
    $('input').val('');
    $('textarea').val('');
    $('#post').slideUp();

    //go back to home and refresh feed
    $('#userprofile').hide();
    $('#feed').find('.twitts').text('');
    sessionData.profile.name = false;
    sessionData.stream.lastIndex = 0;
    loadTwitts(sessionData.profile.name);
  });

  //display twittler profile when handle name clicked
  $('#feed').on('click', '.profile', function(event) {
    sessionData.profile.lastIndex = 0;
    sessionData.profile.name = $(this).data('username');
    $('#feed').find('.twitts').text('');
    $('#userprofile').text('Showing ' + sessionData.profile.name + '\'s twitts');
    $('#userprofile').show();
    loadTwitts(sessionData.profile.name);
  });

  //reset twittler back to feed when header is clicked
  $('body').on('click', '#header', function() {
    if (sessionData.profile.name) {
      $('#userprofile').hide();
      $('#feed').find('.twitts').text('');
      sessionData.profile.name = false;
      sessionData.stream.lastIndex = 0;
      loadTwitts(sessionData.profile.name);
    }
  });
  

  //continuously load feed updates
  //scheduleRefresh();
});

//used for continuous feed updates
var scheduleRefresh = function(){
  if (!sessionData.profile.name) {
    $('#userprofile').hide();
    loadTwitts(sessionData.profile.name);
  } else {
    loadTwitts(true, sessionData.profile.name);
  }
  if (sessionData.autoload) {
    setTimeout(scheduleRefresh, 1000);
  }
};

//used to load new twitts
function loadTwitts(user) {
  //determine if user is loading twitts from feed or profile
  if (!user) {
    //if no user handle is passed, assume load from feed
    for (var i = sessionData.stream.lastIndex; i < streams.home.length; i++) {
      displayTwitt(formatTwitt(streams.home[i]));
    }
    sessionData.stream.lastIndex = streams.home.length;
  } else {
    //if user handle passed, assume load from profile
    for (var i = sessionData.profile.lastIndex; i < streams.users[user].length; i++) {
      displayTwitt(formatTwitt(streams.users[user][i]));
    }
    sessionData.profile.lastIndex = streams.users[user].length;
  }
}

//formats twitt into html string ready for insertion to feed
//when provided with a twitt object
function formatTwitt(twitt) {
  var formattedTwitt = '<li>';
  formattedTwitt += '<span class=\"handle\"><a href=\"#\" class=\"profile\" data-username=\"' + twitt.user + '\">@' + twitt.user + '</a></span>';
  formattedTwitt += ' : <span class=\"content\">' + twitt.message + '</span>';
  formattedTwitt += '<span class=\"time\">' + twitt.created_at.toLocaleString() + '</span>';
  formattedTwitt += '</li>';
  return formattedTwitt;
}

//pushes a formatted twitt string to feed
function displayTwitt(twittStr) {
  var $body = $('#feed').find('.twitts');
  var $twitt = $(twittStr);

  //prepend twitt as hidden with delayed fade in for visual effect
  $twitt.prependTo($body).hide().fadeIn(200);
}