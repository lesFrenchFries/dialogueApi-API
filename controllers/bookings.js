const express = require('express');
const DialogueAvailabilitiesDataLoader = require('./lib/dialogue-availabilities.js');

module.exports = (bookingLoader) => {
    const bookings = express.Router();
    
    bookings.post('/bookings', (req,res) => {
        var specId = req.body.userId;
        var date = req.body.date; // FORMAT TO BE CONFIRMED
        var time = req.body.time; // FORMAT TO BE CONFIRMED
        var token = req.body.token;
        var bookingData = {
            token: token,
            startTime: date, // ADD TIME
            endTime: date, // ADD TIME, PLUS 20 MINS
            location: Math.ceil(10*Math.random()) // WE AREN'T USING THIS AS OF NOW
        };
        var rawOutput = {};
        bookingLoader.createBooking(bookingData)
        .then(data => {
            rawOutput.data = data;
            return DialogueAvailabilitiesDataLoader.getAllUserData()
        })
        .then(data => {
            var professionals = DialogueAvailabilitiesDataLoader.getAllProfessionals(data);
            var locations = DialogueAvailabilitiesDataLoader.getAllLocations(data);
            var specializations = DialogueAvailabilitiesDataLoader.getAllSpecializations(data);
            // Use specId to find specialization in specializations
            specializations.forEach(spec=>{
                if (spec.id == specId) {
                    rawOutput.specialization = spec.spec;
                }
            })
            // Use specId to find firstName, lastName and locationId in professionals
            professionals.forEach(profession=>{
                if (profession.specId == specId) {
                    rawOutput.firstName = profession.firstName;
                    rawOutput.lastName = profession.lastName;
                    rawOutput.locationId = profession.locationId;
                }
            })
            // Use locationId to find address in locations
            locations.forEach(location=>{
                if (location.id == rawOutput.locationId) {
                    rawOutput.address = location.address;
                }
            })
            // FORMAT OUTPUT ACCORDINGLY
            var formattedOutput = {};
            
            // RETURN OUTPUT
        }).catch(alert)
    })

    return bookings;
};