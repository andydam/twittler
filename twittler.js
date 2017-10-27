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
      $('#twitter').text(sessionData.profile.name + '\'s twitts');
      $('#twitter').show();
      loadTwitts(true, sessionData.profile.name);
    //}
  });
});

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
  $twitt.prependTo($body);
}