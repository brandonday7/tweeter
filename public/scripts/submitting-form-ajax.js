$(document).ready(function () {
  $('form').on('submit', function (event) {
    event.preventDefault();

    let newTweetElements = $(this).parent().children();
    if (newTweetElements.length > 2) {
      newTweetElements.last().remove();
    }


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

    let inputText = $(this).serialize();

    $.ajax({
      url: '/tweets/',
      method: 'POST',
      data: inputText,
      success: function () {
        console.log('ajax succeeded');
      }
    });
    return;
  })
})