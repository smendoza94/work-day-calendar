// hours for each time block, each index is also used as ID's for elements
const hours = ['9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM'];
// initialize tasks for local storage, and currentTime to compare for time block color
let tasks = {};
let currentTime

// display the current date in the header
$('#currentDay').text(moment().format('MMMM Do YYYY'));

// setInterval reloads every second to save the local time
setInterval(function(){
    // save local time to variable to be compared for background color
    currentTime = ( moment().format('LTS') ); 
},1000);

// function to create each time block 
function createTimeBlocks(hours,tasks) {
    // iterate through for each "hours" value and create a time block
    for (let i = 0; i < hours.length; i++){
        // create div for bootstap grid "row" class
        const rowEl = $('<div>').addClass('time-block row');
        // create div display for hour with bootstrap grid col class, display hour value, and attribute to compare for background color
        const timeEl = $('<div>').addClass('hour col-2').text(hours[i]).attr('id',moment().format('LL') + " " + hours[i]); 
        // create the task text area with bootstrap elements and name attr
        const taskEl = $('<textarea>').addClass('description col-9').attr('name',hours[i]);
        // if this time-block's hour is less than, greater than, or is the current hour, apply past, future, or present class for background color
        if ( new Date(timeEl.attr('id')).getHours() < new Date(moment().format('LLL')).getHours() ) {
            taskEl.addClass('past');
        } else if ( new Date(timeEl.attr('id')).getHours() > new Date(moment().format('LLL')).getHours() ) {
            taskEl.addClass('future');
        } else {
            taskEl.addClass('present');
        }
        // look through the loaded tasks for task values saved and display them in the time block
        for (j = 0; j < Object.keys(tasks).length; j++) {
            if ( Object.keys(tasks)[j] === taskEl.attr('name') ){
                taskEl.text(tasks[hours[i]]);
            }
        }
        // create the save button to save the tasks in per each time block
        const saveBtn = $('<button>').addClass('saveBtn col-1 oi oi-file').attr('id',hours[i]);            
        // append the time, task, and save button as children to the row div
        rowEl.append(timeEl, taskEl, saveBtn);
        // append the row div to the container div
        $(".container").append(rowEl);
    }
};

// when the save button is clicked...
$('.container').on('click','button', function () {
    let taskId = $(this).attr('id'); // ... use the button id as the key, ...
    let taskText = $('textarea[name="' + taskId + '"]').val(); // ... the user input text as the value, ...
    tasks[taskId] = taskText; // ... and add the key: value pair to tasks object
    saveTasks(); // save tasks object to local storage
});

// save the "tasks" object to local storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// check local storage for saved tasks
function loadTasks() {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    // if nothing in localStorage, create empty object
    if (!tasks) {
        tasks = {};
    }
    // after loading tasks create the time block elements and pass in the hours array and tasks object
    createTimeBlocks(hours,tasks);
    saveTasks();
};

// load the tasks into an object, then create the elements
loadTasks();