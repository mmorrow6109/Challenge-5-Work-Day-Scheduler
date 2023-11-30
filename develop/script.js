$(document).ready(function() {
  var currentDate = dayjs();
  var formattedDate = currentDate.format('dddd, MMMM D, YYYY');
  $('#currentDay').text(formattedDate);

  var currentHour = dayjs().hour();
  $('.time-block').each(function() {
    var blockHour = parseInt($(this).attr('id').split('-')[1]);

    if (blockHour < currentHour) {
      $(this).removeClass('future present').addClass('past');
    } else if (blockHour === currentHour) {
      $(this).removeClass('future past').addClass('present');
    } else {
      $(this).removeClass('past present').addClass('future');
    }
  });

  $('.time-block').each(function() {
    var blockId = $(this).attr('id');
    var savedEvent = localStorage.getItem(blockId);
    if (savedEvent) {
      $('#' + blockId + ' .description').val(savedEvent);
    }
  });

  $('.saveBtn').on('click', function() {
    var eventText = $(this).siblings('.description').val();
    var blockId = $(this).parent().attr('id');
    localStorage.setItem(blockId, eventText);
  });
});