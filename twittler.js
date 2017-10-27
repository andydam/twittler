var sessionData = {
  'profile' : {
    'name' : false,
    'lastIndex' : 0
  },
  'stream' : {
    'lastIndex' : 0
  }
};

$(document).ready(function(){
  loadTwitts(sessionData.profile.name);
  $('#feed').on('click', '.refresh',function(event) {
    //event.stopPropagation();
    event.preventDefault();
    if (!sessionData.profile.name) {
      $('#twitter').hide();
      loadTwitts(sessionData.profile.name);
    } else {
      loadTwitts(true, sessionData.profile.name);
    }
  });
  $('#feed').on('click', '.profile', function(event) {
    //if (!sessionData.profile) {
      //sessionData.stream.lastIndex = 0;
      sessionData.profile.lastIndex = 0;
      sessionData.profile.name = $(this).data('username');
      $('#feed').find('.twitts').text('');
      $('#twitter').text('Showing ' + sessionData.profile.name + '\'s twitts');
      $('#twitter').show();
      loadTwitts(true, sessionData.profile.name);
    //}
  });
  $('body').on('click', '#header', function() {
    //reset page
    if (sessionData.profile.name) {
      $('#twitter').hide();
      $('#feed').find('.twitts').text('');
      sessionData.profile.name = false;
      sessionData.stream.lastIndex = 0;
      loadTwitts(sessionData.profile.name);
    }
  });
  scheduleRefresh();
});

var scheduleRefresh = function(){
  if (!sessionData.profile.name) {
    $('#twitter').hide();
    loadTwitts(sessionData.profile.name);
  } else {
    loadTwitts(true, sessionData.profile.name);
  }
  setTimeout(scheduleRefresh, 1000);
};

function loadTwitts(user, username) {
  if (!user) {
    for (var i = sessionData.stream.lastIndex; i < streams.home.length; i++) {
      displayTwitt(formatTwitt(streams.home[i]));
    }
    sessionData.stream.lastIndex = streams.home.length;
  } else {
    for (var i = sessionData.profile.lastIndex; i < streams.users[username].length; i++) {
      displayTwitt(formatTwitt(streams.users[username][i]));
    }
    sessionData.profile.lastIndex = streams.users[username].length;
  }
}

function formatTwitt(twitt) {
  var formattedTwitt = '<li>';
  formattedTwitt += '<span class=\"handle\"><a href=\"#\" class=\"profile\" data-username=\"' + twitt.user + '\">@' + twitt.user + '</a></span>';
  formattedTwitt += ' : <span class=\"content\">' + twitt.message + '</span>';
  formattedTwitt += '<span class=\"time\">' + twitt.created_at.toLocaleString() + '</span>';
  formattedTwitt += '</li>';
  return formattedTwitt;
}

function displayTwitt(twittStr) {
  var $body = $('#feed').find('.twitts');
  var $twitt = $(twittStr);
  $twitt.prependTo($body).hide().fadeIn(200);
}