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
  let d = new Date();

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
      <p class="tweet-time-stamp">${Math.floor((d - timeStamp)/86400000)} days ago</p>
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
      $('#tweet-log').append($tweet);
    }
  })
}


function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}



$(document).ready(function () {
  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (returnedData) {
        renderTweets(returnedData);
      }
    });
  }
loadTweets();

})

