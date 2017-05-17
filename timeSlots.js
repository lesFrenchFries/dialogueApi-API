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
// var calendarPage = 0; // Date input instead
// var today = Date.now(); // Will be an input
// var weekStartTime = today-(today+4*24*60*60*1000)%(7*24*60*60*1000);
// var weekEndTime = today-(today+4*24*60*60*1000)%(7*24*60*60*1000) + 7*24*60*60*1000;
// var s = new Date (weekStartTime);
// var e = new Date (weekEndTime);
// var start_time = `${s.getFullYear()}-${s.getMonth()+1}-${s.getDate()} 00:00:00`;
// var end_time = `${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()} 00:00:00`;
// console.log(new Date(weekStartTime))
// console.log(new Date(weekEndTime))
// console.log(start_time,end_time)


class TimeSlots {
    
    constructor() {
        this.startIntervals = [];
        this.endIntervals = [];
        this.slotDuration = 20;
        for (var i = 0; i < 24 * 60/this.slotDuration; i++) {
            this.startIntervals.push(this.slotDuration*i);
            this.endIntervals.push(this.slotDuration*(i+1));
        }
    }
    
    getAvailableTimes(spec,today) {
        // var spec = 'Coach'; // Input
        var specId; // Initialization
        // var today = Date.now(); // Will be an input
        var weekStartTime = today-(today+4*24*60*60*1000)%(7*24*60*60*1000);
        var weekEndTime = today-(today+4*24*60*60*1000)%(7*24*60*60*1000) + 7*24*60*60*1000;
        var s = new Date (weekStartTime);
        var e = new Date (weekEndTime);
        var start_time = `${s.getFullYear()}-${s.getMonth()+1}-${s.getDate()} 00:00:00`;
        var end_time = `${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()} 00:00:00`;

        // Get all data
        return DialogueAvailabilitiesDataLoader.getAllUserData()
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
            shifts.forEach(shift=>{ // Assign shift start and end times
                var tempStart = new Date(shift.startTime);
                var tempEnd = new Date(shift.endTime);
                shiftStarts.push(tempStart.getTime()-4*60*60*1000/*TimeZone adjustment*/);
                shiftEnds.push(tempEnd.getTime()-4*60*60*1000/*TimeZone adjustment*/);
            })
            var weekDates = new Array(7);
            for (var j = 0; j < weekAvailabilities.length; j++) { // Day by day
                weekDates[j]=new Date(weekStartTime+j*24*60*60*1000);
                weekAvailabilities[j]=availabilities.map(x=>x.slice());
                for (var i = 0; i < shifts.length; i++) { // Shift by shift
                    weekAvailabilities[j] = weekAvailabilities[j].map((slot,idx)=>{ // Slot by slot
                        var start = this.startIntervals[idx]*60*1000 + weekStartTime + j*24*60*60*1000;
                        var end = this.endIntervals[idx]*60*1000 + weekStartTime + j*24*60*60*1000;
                        if (start>shiftStarts[i] && end<shiftEnds[i]) { // If included in this shift
                            slot = slot.concat(shifts[i].userId); // Can we push to an empty array?
                        }
                        return slot;
                    })
                }
            }
            // console.log(weekAvailabilities)
            // console.log(weekDates)
            // console.log('Before outputting methode 1', this)
            var output = {
                weekAvailabilities: weekAvailabilities,
                weekDates: weekDates
            }
            // console.log(output)
            return output;
        });
    }
    
    getFreeSlots(input) {
        var weekAvailabilities = input.weekAvailabilities;
        var weekDates = input.weekDates;

        return bookingLoader.getAllBookingsForWeek(weekDates[0])
        .then(bookings => {
            return weekDates.map((date,day)=>{ // Day by day
                 return weekAvailabilities[day]=weekAvailabilities[day].map((specialists,idx) => { // Slot by slot
                    var startTimeInMins = this.startIntervals[idx];
                    var startTimeMin = startTimeInMins%60;
                    var startTimeHour = Math.floor(startTimeInMins/60);
                    var startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), startTimeHour, startTimeMin);
                    bookings.forEach(booking => { // Booking by booking
                        if (booking.startTime.toString() == startDate.toString()) { // If this slot matches a booking, remove the specialist of that booking
                            // console.log('Match!');
                            var index = specialists.indexOf(booking.specialist);
                            if (index !=-1) {
                                specialists.splice(index,1);
                            }
                        }
                    })
                    return specialists;
                })
            })
        });
    }
    
}
module.exports = new TimeSlots();

// var spec = 'Coach'; // Input
// var specId; // Initialization
// var today = Date.now(); // Will be an input
// var weekStartTime = today-(today+4*24*60*60*1000)%(7*24*60*60*1000);
// var weekEndTime = today-(today+4*24*60*60*1000)%(7*24*60*60*1000) + 7*24*60*60*1000;
// var s = new Date (weekStartTime);
// var e = new Date (weekEndTime);
// var start_time = `${s.getFullYear()}-${s.getMonth()+1}-${s.getDate()} 00:00:00`;
// var end_time = `${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()} 00:00:00`;
// // console.log(new Date(weekStartTime))
// // console.log(new Date(weekEndTime))
// // console.log(start_time,end_time)


// // Get all data
// DialogueAvailabilitiesDataLoader.getAllUserData()
// .then(DialogueAvailabilitiesDataLoader.getAllSpecializations)
// // Get all specializations to find the specId
// .then(specs => { 
//     specs.forEach(thisSpec => {
//         if (thisSpec.spec == spec) { // Get the specId
//             specId = thisSpec.id;
//         }
//     })
// })
// // Get all shifts
// .then(() => { 
//     return DialogueAvailabilitiesDataLoader.getAllShifts(start_time,end_time);
// })
// // Get all shifts for specId
// .then(shifts => {
//     return DialogueAvailabilitiesDataLoader.getAllShiftsForSpecialization(shifts, specId)
// })
// .then(shifts => {
//     var shiftStarts = [];
//     var shiftEnds = [];
//     shifts.forEach(shift=>{
//         var tempStart = new Date(shift.startTime);
//         var tempEnd = new Date(shift.endTime);
//         shiftStarts.push(tempStart.getTime()-4*60*60*1000/*TimeZone adjustment*/);
//         shiftEnds.push(tempEnd.getTime()-4*60*60*1000/*TimeZone adjustment*/);
//     })
//     // console.log('shifts', shifts)
//     // console.log('shiftStarts and shiftEnds', shiftStarts, shiftEnds)
//     var weekDates = new Array(7);
//     for (var j = 0; j < weekAvailabilities.length; j++) { // Day by day
//         weekDates[j]=new Date(weekStartTime+j*24*60*60*1000);
//         weekAvailabilities[j]=availabilities.map(x=>x.slice());
//         // console.log(weekAvailabilities)
//         // // weekAvailabilities[j] = availabilities.slice()
//         // console.log('slot 1 - before', weekAvailabilities[0][0])
//         // // weekAvailabilities[0][0] = [9];
//         // // weekAvailabilities[0][0] = weekAvailabilities[0][0].concat(5);
//         // console.log('week avail', weekAvailabilities)
//         for (var i = 0; i < shifts.length; i++) { // Shift by shift
//             // console.log(weekAvailabilities)
//             weekAvailabilities[j] = weekAvailabilities[j].map((slot,idx)=>{ // Slot by slot
//                 var start = startIntervals[idx]*60*1000 + weekStartTime + j*24*60*60*1000;
//                 var end = endIntervals[idx]*60*1000 + weekStartTime + j*24*60*60*1000;
//                 // console.log(shiftStarts[i]-start,end-shiftEnds[i])
//                 if (start>shiftStarts[i] && end<shiftEnds[i]) { // If included in this shift
//                     // console.log(new Date(start));
//                     // console.log(new Date(shiftStarts[i]))
//                     // console.log(i,j,idx)
//                     // console.log(slot.length)
//                     slot = slot.concat(shifts[i].userId); // Can we push to an empty array?
//                     // console.log(slot)
//                     // console.log(shifts[i].userId)
//                     // console.log(weekAvailabilities[j][idx])
//                 }
//                 // console.log(slot)
//                 return slot;
//             })
//         }
//     }
//     // console.log(weekAvailabilities) // Availabilities are offset due to timezones
//     // console.log(weekDates)
// })
