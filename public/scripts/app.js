/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


function createTweetElement(tweet) {
  let profilePicPath = tweet.user.avatars.small;
  let twitterName = tweet.user.name;
  let twitterHandle = tweet.user.handle;
  let tweetBody = tweet.content.text;
  let timeStamp = tweet.created_at;

  //time stamp translation
  let d = new Date();
  let timeDiff = d - timeStamp;
  let ago = '0';
  if (timeDiff > 86400000) {
    ago = `${Math.floor(timeDiff/86400000)}`
    ago += `${ago === '1' ? ' day' : ' days' } ago`
  } else if (timeDiff > 3600000) {
    ago = `${Math.floor(timeDiff/3600000)}`
    ago += `${ago === '1' ? ' hour' : ' hours' } ago`
  } else if (timeDiff > 60000) {
    ago = `${Math.floor(timeDiff/60000)}`
    ago += `${ago === '1' ? ' minute' : ' minutes' } ago`
  } else if (timeDiff > 1000) {
    ago = `${Math.floor(timeDiff/1000)}`
    ago += `${ago === '1' ? ' second' : ' seconds' } ago`
  } else if (timeDiff < 1000) {
    ago = "Just now";
  }

  let tweetString =
  $(`<article class="tweet">
    <header>
      <img class="profile-pic" src=${profilePicPath}>
      <p class="twitter-name"><b>${twitterName}</b></p>
      <p class="twitter-handle">${twitterHandle}</p>
    </header>
    <div class="tweet-body">
      <p>${escape(tweetBody)}</p>
    </div>
    <footer>
      <p class="tweet-time-stamp">${ago}</p>
      <div class="icons">
        <img class="flag-icon" src="/images/flag.png" width="25px" height="25px">
        <img class="retweet-icon" src="/images/retweet.png" width="25px" height="25px">
        <img class="heart-icon" src="/images/heart.png" width="25px" height="25px">
      </div>
    </footer>
  </article>`);

  return tweetString;

}


function renderTweets(tweets) {
  $(document).ready(function () {
    for (index in tweets) {
      let $tweet = createTweetElement(tweets[index]);
      $('#tweet-log').prepend($tweet);
    }
      let dynamicTweetBackround = `${$('#tweet-log').children().length*232}px`; //height of white background
      $('#tweet-log').css('height', dynamicTweetBackround);
  })
}


function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}



function loadTweets() {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    success: function (returnedData) {
      $('#tweet-log').empty();
      renderTweets(returnedData);
    }
  });
}






//Load the tweets page
$(document).ready(function () {
  loadTweets();
})





//AJAX POST and submission errors

$(document).ready(function () {
  $('form').on('submit', function (event) {
    event.preventDefault();

    //remove last error message (if any)
    let newTweetElements = $(this).parent().children();
    if (newTweetElements.length > 2) {
      newTweetElements.last().remove();
    }

    //error message handling for inproper submission
    let currentTweet = $('textarea[name=text]').val();
    if (currentTweet === '' || currentTweet === null) {
      let errorMessage = "You cannot submit an empty field";
      let errorChild = $('<h5>').text(errorMessage).addClass('error-message');
      $(this).parent().append(errorChild);
      return;

    } else if (currentTweet.length > 140) {
      let errorMessage = "Tweet content too long!";
      let errorChild = $('<h5>').text(errorMessage).addClass('error-message');
      $(this).parent().append(errorChild);
      return;
    }

    //successful submission, serialize the text
    let inputText = $(this).serialize();

    //post
    $.ajax({
      url: '/tweets/',
      method: 'POST',
      data: inputText,
    }).done(loadTweets)
    .fail(function(err) {
      console.log("Error: ", err);
    })

    //remove the text from the input field
    $('textarea').val(null);

    return;

  })
})
