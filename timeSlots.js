const DialogueAvailabilitiesDataLoader = require('./lib/dialogue-availabilities.js');
const DialogueBookingsDataLoader = require('./lib/dialogue-bookings.js');

const mysql = require('promise-mysql');
// const moment = require('moment');

// Database / booking loader initialization
var connection = mysql.createPool({
  user: 'root',
  database: 'dialogueApp'
});
var bookingLoader = new DialogueBookingsDataLoader(connection);

// Generate time differenc
var startIntervals = [];
var endIntervals = [];
var slotDuration = 20;
for (var i = 0; i < 24 * 60/slotDuration; i++) {
    startIntervals.push(slotDuration*i);
    endIntervals.push(slotDuration*(i+1));
}

// Generate availabilities
var availabilities = new Array(24*60/slotDuration).fill([]);
var weekAvailabilities = new Array(7);

// Testing data
var calendarPage = 0; // Date input instead
var today = Date.now(); // Will be an input
var weekStartTime = today-(today+4*24*60*60*1000)%(7*24*60*60*1000);
var weekEndTime = today-(today+4*24*60*60*1000)%(7*24*60*60*1000) + 7*24*60*60*1000;
var s = new Date (weekStartTime);
var e = new Date (weekEndTime);
var start_time = `${s.getFullYear()}-${s.getMonth()+1}-${s.getDate()} 00:00:00`;
var end_time = `${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()} 00:00:00`;
console.log(new Date(weekStartTime))
console.log(new Date(weekEndTime))
console.log(start_time,end_time)


class TimeSlots {
        
    getAvailableTimes(spec,calendarPage) {
        var currentStartTime = weekStartTime + calendarPage*7*24*60*60*1000;
        var currentEndTime = weekEndTime + calendarPage*7*24*60*60*1000;
    }
    
}
module.exports = new TimeSlots();

var spec = 'Coach'; // Argument
var specId; // Initialization
var currentStartTime = weekStartTime+ calendarPage*7*24*60*60*1000;
var currentEndTime = weekEndTime + calendarPage*7*24*60*60*1000;


// Get all data
DialogueAvailabilitiesDataLoader.getAllUserData()
.then(DialogueAvailabilitiesDataLoader.getAllSpecializations)
// Get all specializations to find the specId
.then(specs => { 
    specs.forEach(thisSpec => {
        if (thisSpec.spec == spec) { // Get the specId
            specId = thisSpec.id;
        }
    })
})
// Get all shifts
.then(() => { 
    return DialogueAvailabilitiesDataLoader.getAllShifts(start_time,end_time);
})
// Get all shifts for specId
.then(shifts => {
    return DialogueAvailabilitiesDataLoader.getAllShiftsForSpecialization(shifts, specId)
})
.then(shifts => {
    var shiftStarts = [];
    var shiftEnds = [];
    shifts.forEach(shift=>{
        var tempStart = new Date(shift.startTime);
        var tempEnd = new Date(shift.endTime);
        shiftStarts.push(tempStart.getTime());
        shiftEnds.push(tempEnd.getTime());
    })
    console.log('shifts', shifts)
    console.log('shiftStarts and shiftEnds', shiftStarts, shiftEnds)
    
    for (var j = 0; j < weekAvailabilities.length; j++) { // Day by day
        weekAvailabilities[j]=availabilities.map(x=>x.slice());
        // console.log(weekAvailabilities)
        // // weekAvailabilities[j] = availabilities.slice()
        // console.log('slot 1 - before', weekAvailabilities[0][0])
        // // weekAvailabilities[0][0] = [9];
        // // weekAvailabilities[0][0] = weekAvailabilities[0][0].concat(5);
        // console.log('week avail', weekAvailabilities)
        for (var i = 0; i < shifts.length; i++) { // Shift by shift
            // console.log(weekAvailabilities)
            weekAvailabilities[j] = weekAvailabilities[j].map((slot,idx)=>{ // Slot by slot
                var start = startIntervals[idx]*60*1000 + weekStartTime + j*24*60*60*1000;
                var end = endIntervals[idx]*60*1000 + weekStartTime + j*24*60*60*1000;
                // console.log(shiftStarts[i]-start,end-shiftEnds[i])
                if (start>shiftStarts[i] && end<shiftEnds[i]) { // If included in this shift
                    console.log(i,j,idx)
                    console.log(slot.length)
                    slot = slot.concat(shifts[i].userId); // Can we push to an empty array?
                    console.log(slot)
                    console.log(shifts[i].userId)
                    console.log(weekAvailabilities[j][idx])
                }
                // console.log(slot)
                return slot;
            })
        }
    }
    console.log(weekAvailabilities) // Availabilities are offset due to C9's time
})
