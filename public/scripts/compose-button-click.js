$(document).ready(function () {
  $('#compose-button').on('click', function () {
    $('.new-tweet').slideToggle( () => {
      $('textarea').focus();
    });
  })
})