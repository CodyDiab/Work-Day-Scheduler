let workDay = {
  
  "9 AM": "",
  "10 AM": "",
  "11 AM": "",
  "12 PM": "",
  "1 PM": "",
  "2 PM": "",
  "3 PM": "",
  "4 PM": "",
  "5 PM": "",
};


$(document).ready(function(){
  
  if(!localStorage.getItem('workDay')) {
    updateScheduledTasks(workDay);
  } else {
    
    updateScheduledTasks(JSON.parse(localStorage.getItem('workDay')));
  }
})

$('#currentDay').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm:ss a'));

var counter = 9;
for(const property in workDay) {
  var textInput = "#text-input" + counter;
  $(textInput).text(workDay[property]);
  var hourId = "#hour" + counter;
  var presentHour = moment().hour();
  var timeString = $(hourId).text();
  var time = stringToNum(timeString);
   
  if(time < presentHour) {
      $(textInput).addClass("past");
  } else if (time > presentHour) {
      $(textInput).addClass("future");
  } else {
      $(textInput).addClass("present");
  }
  counter ++;
}


$("button").click(function() {
  value = $(this).siblings("textarea").val();
  hourString = $(this).siblings("div").text();

  saveSchedule(hourString, value);
});

// coversion 
function stringToNum(hourString) {
  switch(hourString) {
  
      case "9 AM": return 9;
      case "10 AM": return 10;
      case "11 AM": return 11;
      case "12 PM": return 12;
      case "1 PM": return 13;
      case "2 PM": return 14;
      case "3 PM": return 15;
      case "4 PM": return 16;
      case "5 PM": return 17;
  }
}

function loadCorrectDataset() {
  result = localStorage.getItem('workDay')
  return (result ? result : workDay);
}

// a local storage
function initializeLocalStorage() {
  localStorage.setItem('workDay', JSON.stringify(workDay));
};


function saveToLocalStorage(dayEl) {
  localStorage.setItem('workDay', JSON.stringify(dayEl));
}


function saveSchedule(hourString, val) {
 
  if(!localStorage.getItem('workDay')) {
      initializeLocalStorage();
  }

  var workHours = JSON.parse(localStorage.getItem('workDay'));
  workHours[hourString] = val

 
  saveToLocalStorage(workHours);
}

function updateScheduledTasks(dayElement) {
  $(".schedule-row").each(function(index) {
      var res = $(this).children("div");
      $(this).children("textarea").text(dayElement[res.text()]);
  })
}
