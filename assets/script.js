let daysToDo = {
  
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
  
  if(!localStorage.getItem('daysToDo')) {
    updateScheduledTasks(daysToDo);
  } else {
    
    updateScheduledTasks(JSON.parse(localStorage.getItem('daysToDo')));
  }
})


var datetime = null,
        date = null;

var update = function () {
    date = moment(new Date())
    datetime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
};

$(document).ready(function(){
    datetime = $('#currentDay')
    update();
    setInterval(update, 1000);
});

//count to loop through task id nums
var counter = 9;
for(const property in daysToDo) {
  var textInput = "#text-input" + counter;
  $(textInput).text(daysToDo[property]);
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

//save button function
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
  result = localStorage.getItem('daysToDo')
  return (result ? result : daysToDo);
}

// a local storage
function initializeLocalStorage() {
  localStorage.setItem('daysToDo', JSON.stringify(daysToDo));
};


function saveToLocalStorage(dayEl) {
  localStorage.setItem('daysToDo', JSON.stringify(dayEl));
}


function saveSchedule(hourString, val) {
 
  if(!localStorage.getItem('daysToDo')) {
      initializeLocalStorage();
  }

  var workHours = JSON.parse(localStorage.getItem('daysToDo'));
  workHours[hourString] = val

 
  saveToLocalStorage(workHours);
}

function updateScheduledTasks(dayElement) {
  $(".schedule-row").each(function(index) {
      var res = $(this).children("div");
      $(this).children("textarea").text(dayElement[res.text()]);
  })
}
//clear day function
$("#remove-tasks").on("click", function() {
 
  localStorage.removeItem('daysToDo')
  window .location.reload();
  
})

//interval for page refresh
window.setInterval('refresh()', (100*60)*30);
function refresh() {
  window .location.reload();
}