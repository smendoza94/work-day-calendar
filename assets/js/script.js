const hours = ['9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM'];

let currentTime

// display the current date in the header
$('#currentDay').text(moment().format('MMMM Do YYYY'));

// setInterval reloads every second to save the local time
setInterval(function(){
    currentTime = ( moment().format('LTS') ); // save local time to variable to be compared
},1000);

function createTimeBlocks(hours) {
    for (let i = 0; i < hours.length; i++){
        const rowEl = $('<div>').addClass('time-block row');
        const timeEl = $('<div>').addClass('hour col-2').text(hours[i])
        .attr('id',moment().format('LL') + " " + hours[i]); 

        if ( new Date(timeEl.attr('id')).getHours() < new Date(moment().format('LLL')).getHours() ) {
            rowEl.addClass('past');
        } else if ( new Date(timeEl.attr('id')).getHours() > new Date(moment().format('LLL')).getHours() ) {
            rowEl.addClass('future');
        } else {
            rowEl.addClass('present');
        }

        const taskEl = $('<textarea>').addClass('description col-9');
        const saveBtn = $('<button>').addClass('saveBtn col-1 oi oi-file');            
        rowEl.append(timeEl, taskEl, saveBtn);
        $(".container").append(rowEl);
    }
};

createTimeBlocks(hours);