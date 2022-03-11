// hours for each time block, each index is also used as ID's for elements
const hours = ['9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM'];
// initialize tasks for local storage, and currentTime to compare for time block color
let tasks = {};
let currentTime

// display the current date in the header
$('#currentDay').text(moment().format('MMMM Do YYYY'));

// setInterval reloads every second to save the local time
setInterval(function(){
    currentTime = ( moment().format('LTS') ); // save local time to variable to be compared for background color
},1000);

// function to create each time block with 
function createTimeBlocks(hours,tasks) {
    for (let i = 0; i < hours.length; i++){
        const rowEl = $('<div>').addClass('time-block row');

        const timeEl = $('<div>').addClass('hour col-2').text(hours[i])
        .attr('id',moment().format('LL') + " " + hours[i]); 

        // create the task text area with bootstrap elements and name attr
        const taskEl = $('<textarea>').addClass('description col-9').attr('name',hours[i]);

        if ( new Date(timeEl.attr('id')).getHours() < new Date(moment().format('LLL')).getHours() ) {
            taskEl.addClass('past');
        } else if ( new Date(timeEl.attr('id')).getHours() > new Date(moment().format('LLL')).getHours() ) {
            taskEl.addClass('future');
        } else {
            taskEl.addClass('present');
        }

        for (j = 0; j < Object.keys(tasks).length; j++) {
            if ( Object.keys(tasks)[j] === taskEl.attr('name') ){
                taskEl.text(tasks[hours[i]]);
            }
        }

        const saveBtn = $('<button>').addClass('saveBtn col-1 oi oi-file').attr('id',hours[i]);            
        
        rowEl.append(timeEl, taskEl, saveBtn);
        $(".container").append(rowEl);
    }
};

$('.container').on('click','button', function () {
    let taskId = $(this).attr('id');
    let taskText = $('textarea[name="' + taskId + '"]').val();
    tasks[taskId] = taskText;
    saveTasks();
});


function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    tasks = JSON.parse(localStorage.getItem("tasks"));

    // if nothing in localStorage, create empty object
    if (!tasks) {
        tasks = {};
    }
    
    createTimeBlocks(hours,tasks);
    saveTasks();
};

loadTasks();