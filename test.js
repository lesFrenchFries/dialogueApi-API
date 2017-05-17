const api_link = 'https://api.wheniwork.com';
const api_key = '86c6930065b9467f4e95c5d28522804ea12ef859';
const username = 'sinriver413@hotmail.com';
const password = 'hunter2hunter2';
const login_token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOjEsImxvZ2luIjoiOTI4MTQyNiIsInBpZCI6IjkyODE0MjYifQ.Kp_cecg9AAFH7KCMYdgBaSko1TxMQMVgWWXrcK-NewBgAjQ_yejhpRg8LxOG2Bc2CJhhg-9Q013akmT-52xjWBe03q5B3u10B3wPbPrRyPVrrTOfSy9VK8mmTBzgkPD-ua6nLwEm_wC6LoVW1k53hd1ZM7YFVjnpfWD5NtN632Hrq3bKTFyR8rsXVjzShyAkBqUJzYN9O8q5WguByYFHgihffMAqCuG96n7izGwBfh1BcC-jXPQIWAc77ZemZWss3WigAlvy8jBbNuNHpOOA-wrFYiUXj54fA2Pkjmkubcn1LRoKYxd7Gw6z-3aEEa3-nXxCK6ynFypzHbnnGk_q7w';

const fetch = require('node-fetch');
const express = require('express');
const mysql = require('promise-mysql');

const DialogueAvailabilitiesDataLoader = require('./lib/dialogue-availabilities.js');

const DialogueBookingsDataLoader = require('./lib/dialogue-bookings.js');

// Database / data loader initialization
var connection = mysql.createPool({
  user: 'root',
  database: 'dialogueApp'
});
var bookingLoader = new DialogueBookingsDataLoader(connection);



// Test 1 : Create 2 bookings
/*
var booking1 = {
    token: '685sgr1s65r1g651g6sr',
    startTime: '2000-04-13 11:00:00',
    endTime: '2000-04-13 17:00:00',
    location: 5,
    specialization: 'coach'
};
var booking2 = {
    token: '5shr685gh65sgsr5sr',
    startTime: '2000-04-17 13:00:00',
    endTime: '2000-04-17 16:00:00',
    location: 7,
    specialization: 'steer'
}
bookingLoader.createBooking(booking1).then(console.log('First booking completed.'))
bookingLoader.createBooking(booking2).then(console.log('Second booking completed.'))
*/
// Result 1 : bookings added and verified in MySQL database



// Test 2 : Get all bookings
/*
var spec = 'coach';
bookingLoader.getAllBookingsForSpecialization(spec).then(console.log);
*/
// Result 2 : successfully console.logged the booking.




// Test 3 : Fetch all WIW data
/*
DialogueAvailabilitiesDataLoader.getAllUserData().then(console.log)
*/
// Result 3 : successfully console.logged the whole data object



// Test 4 : Retrieve all shifts
/**/
var startTime ="2017-05-14 00:00:00"
var endTime = "2017-05-20 23:59:59"
DialogueAvailabilitiesDataLoader.getAllShifts(startTime,endTime).then(console.log)
/**/
// Result 4 : successfully console.logged wtih mock data



// Test 5 : Refine shifts to specialization
/**/
var spec = 'Coach';
var specId;

// Get all data
DialogueAvailabilitiesDataLoader.getAllUserData()
.then(data=>{
    return DialogueAvailabilitiesDataLoader.getAllSpecializations(data)
})
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
    return DialogueAvailabilitiesDataLoader.getAllShifts(startTime,endTime);
})
// Get all shifts for specId
.then(shifts => {
    return DialogueAvailabilitiesDataLoader.getAllShiftsForSpecialization(shifts, specId)
})
.then(console.log)
/**/
// Result 5 : successfully console.logged with mock data


// Test 6 : Compare with bookings to determine availibility


// Test 7 : For a time slot, return first name, last name, address, specialization and time slow

// Test 8 : Return data of availabilities

var startTime ="2017-05-14 05:00:00"
var test = new Date(startTime);
console.log(test.getHours())

const moment = require('moment');
var test2 = moment().startOf('day').fromNow();
console.log(test2)
