/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];


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

renderTweets(data);

