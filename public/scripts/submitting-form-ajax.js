$(document).ready(function () {
  $('form').on('submit', function (event) {
    event.preventDefault();
    let inputText = $(this).serialize();


    $.ajax({
      url: '/tweets/',
      method: 'POST',
      data: inputText,
      success: function () {
        console.log('ajax succeeded', data);
      }
    });

  })
})