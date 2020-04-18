let workDay = {
  "7 AM": "",
  "8 AM": "",
  "9 AM": "",
  "10 AM": "",
  "11 AM": "",
  "12 PM": "",
  "1 PM": "",
  "2 PM": "",
  "3 PM": "",
  "4 PM": "",
};


$(document).ready(function(){
  // if nothing in local storage then call update scheduled tasks
  if(!localStorage.getItem('workDay')) {
    updateScheduledTasks(workDay);
  } else {
    // otherise update scheduled tasks
    updateScheduledTasks(JSON.parse(localStorage.getItem('workDay')));
  }
})

$('#currentDay').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm:ss a'));

var counter = 7;
for(const property in workDay) {
  var textInput = "#text-input" + counter;
  $(textInput).text(workDay[property]);
  var hourId = "#hour" + counter;
  var presentHour = moment().hour();
  var timeString = $(hourId).text();
  var time = hourNumberFromHourString(timeString);
   
  if(time < presentHour) {
      $(textInput).addClass("bg-dark");
  } else if (time > presentHour) {
      $(textInput).addClass("future");
  } else {
      $(textInput).addClass("present");
  }
  counter ++;
}

// get value of textarea and hourString and call saveSchedule when button is clicked
$("button").click(function() {
  value = $(this).siblings("textarea").val();
  hourString = $(this).siblings("div").text();

  // call saveSchedule
  saveSchedule(hourString, value);
});

// switch statement to convert hour string into hour number
function hourNumberFromHourString(hourString) {
  switch(hourString) {
      case "7 AM": return 7;
      case "8 AM": return 8;
      case "9 AM": return 9;
      case "10 AM": return 10;
      case "11 AM": return 11;
      case "12 PM": return 12;
      case "1 PM": return 13;
      case "2 PM": return 14;
      case "3 PM": return 15;
      case "4 PM": return 16;
  }
}

function loadCorrectDataset() {
  result = localStorage.getItem('workDay')
  return (result ? result : workDay);
}

// add function to initialize local storage
function initializeLocalStorage() {
  localStorage.setItem('workDay', JSON.stringify(workDay));
};

// add function save to localStorage
function saveToLocalStorage(dayEl) {
  localStorage.setItem('workDay', JSON.stringify(dayEl));
}

// add function to save schedule
function saveSchedule(hourString, val) {
  // if nothing in local storage then call initialize local storage
  if(!localStorage.getItem('workDay')) {
      initializeLocalStorage();
  }

  var workHours = JSON.parse(localStorage.getItem('workDay'));
  workHours[hourString] = val

  // call save to local storage
  saveToLocalStorage(workHours);
}

// add function to update scheduled tasks
function updateScheduledTasks(dayElement) {
  $(".schedule-row").each(function(index) {
      var res = $(this).children("div");
      $(this).children("textarea").text(dayElement[res.text()]);
  })
}
