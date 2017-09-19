$(document).ready(function() {
  $('textarea[name=text]').on('keyup', function() {
    let tweetLength = $(this).val().length;
    let remainingChars = 140 - tweetLength;

    $('.counter').text(remainingChars);
    if (remainingChars < 0) {
      $('.counter').addClass('counter-error');
      return;
    }

    $('.counter').removeClass('counter-error');
  });
});