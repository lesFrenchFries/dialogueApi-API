const express = require('express');
const moment = require('moment');
const DialogueAvailabilitiesDataLoader = require('../lib/dialogue-availabilities.js');

module.exports = (bookingLoader) => {
    const bookings = express.Router();
    
    bookings.post('/', (req,res) => {
        // Request data extraction
        var userId = req.body.userId;
        var date = req.body.date; // 2000-04-13T00:00:00.000Z
        var time = req.body.time; // HH:mm
        var token = req.body.token;
        
        // Format start time for booking
        var formattedStart = moment(date).format('YYYY-MM-DD') + " " + time + ":00";
        
        // Compute and format end time for booking
        var timeInputs = time.split(':');
        var endMinutes = parseInt(timeInputs[1])+20;
        var endHours;
        if (endMinutes == 60) {
            endMinutes = 0;
            endHours = parseInt(timeInputs[0])+1;
        } else {
            endHours = timeInputs[0];
        }
        var formattedEnd = moment(date).format('YYYY-MM-DD') + " " + endHours + ":" + endMinutes + ":00";
        
        // Preparing data for booking
        var bookingData = {
            token: token,
            startTime: formattedStart, // ADD TIME
            endTime: formattedEnd, // ADD TIME, PLUS 20 MINS
            location: Math.ceil(10*Math.random()), // WE AREN'T USING THIS AS OF NOW
            specialist: userId
        };
        
        var rawOutput = {};
        
        // Create booking
        bookingLoader.createBooking(bookingData)
        .then(data => {
            rawOutput.data = data;
            return DialogueAvailabilitiesDataLoader.getAllUserData()
        })
        .then(data => {
            // Get all reference arrays
            var professionals = DialogueAvailabilitiesDataLoader.getAllProfessionals(data);
            var locations = DialogueAvailabilitiesDataLoader.getAllLocations(data);
            var specializations = DialogueAvailabilitiesDataLoader.getAllSpecializations(data);
            
            // Use userId to find firstName, lastName and locationId in professionals
            professionals.forEach(professional=>{
                if (professional.id == userId) {
                    rawOutput.firstName = professional.firstName;
                    rawOutput.lastName = professional.lastName;
                    rawOutput.locationId = professional.locationId;
                    rawOutput.specId = professional.specId
                }
            })
            
            // Use locationId to find address in locations
            locations.forEach(location=>{
                if (location.id == rawOutput.locationId) {
                    rawOutput.address = location.address;
                }
            })
            
            // Use specId to find specialization in specializations
            specializations.forEach(spec=>{
                if (spec.id == rawOutput.specId[0]) {
                    rawOutput.specialization = spec.spec;
                }
            })
            
            // Format output 
            var formattedOutput = {
                firstName: rawOutput.firstName,
                lastName: rawOutput.lastName,
                address: rawOutput.address,
                time: formattedStart,
                specialization: rawOutput.specialization
            };
            
            // Return output
            return formattedOutput;
        })
        .then(booking => {
            console.log(booking);
            return res.status(201).json(booking);
        })
        .catch(console.error)
    })

    return bookings;
};