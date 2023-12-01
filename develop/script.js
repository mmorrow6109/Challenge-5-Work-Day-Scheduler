// "$" is a shortcut for "jQuery".  It is also acting as a QuerySelectorAll (?)

$(document).ready(function() {
  let currentDate = dayjs(); // function necessary to run DAY.JS and display the current date
  let formattedDate = currentDate.format('dddd, MMMM D, YYYY');
  $('#currentDay').text(formattedDate);

  let currentHour = dayjs().hour();
  $('.time-block').each(function() {
    let blockHour = parseInt($(this).attr('id').split('-')[1]);
    // parseInt is converting the string into a number
    //line 8 is saying, variable blockHour is now a number.
    //"this" is referring to the time-block class (each time it runs, "this" is the current time-block) 
    //attr is getting the attribute of the id.  NOT the ID itself, but the attribute that is the ID 
    //split is splitting the string into an array 
    //[1] is calling to display the 2nd item in the array (ex. the number on HTML line 33 is 9)
    
    if (blockHour < currentHour) {
      $(this).removeClass('future present').addClass('past');
    } else if (blockHour === currentHour) {
      $(this).removeClass('future past').addClass('present');
    } else {
      $(this).removeClass('past present').addClass('future');
    }
  });

  $('.time-block').each(function() {
    let blockId = $(this).attr('id');
    let savedEvent = localStorage.getItem(blockId);
    if (savedEvent) {
      $('#' + blockId + ' .description').val(savedEvent);
    }

    // "this" is referring to the time-block class.
    // method: "each" is looping through each time-block class
    // attr: "id" is getting the ID attribute of each time-block class
    // $('#' + blockId + ' .description') is drilling into the HTML object to get the description class of each time-block class (?)
    // .val(savedEvent) is setting the value of the description class to the savedEvent variable

  });

  $('.saveBtn').on('click', function() {
    let eventText = $(this).siblings('.description').val();
    let blockId = $(this).parent().attr('id');
    localStorage.setItem(blockId, eventText);
  });
});