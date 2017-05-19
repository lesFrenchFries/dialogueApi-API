const express = require('express');
const moment = require('moment');
const DialogueAvailabilitiesDataLoader = require('../lib/dialogue-availabilities.js');

module.exports = (bookingLoader, timeSlots) => {
    const bookings = express.Router();
    
    // Endpoint to create a booking
    bookings.post('/', (req,res) => {
        // Request data extraction
        // var userId = req.body.userId; // NO LONGER AN INPUT, TO BE COMPUTED
        var date = req.body.date; // 2000-04-13T00:00:00.000Z
        var time = req.body.startTime; // HH:mm
        // var token = req.body.token; // OBSOLETE
        var sub = req.user.sub;
        var spec = req.body.spec; // NEW ADDITION
        console.log(req.body)
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
            sub: sub,
            startTime: formattedStart, 
            endTime: formattedEnd, 
            location: Math.ceil(10*Math.random()), // WE AREN'T USING THIS AS OF NOW
            // specialist: userId // NO LONGER AVAILABLE, NEEDS TO BE COMPUTED
        };
        
        var rawOutput = {};
        // Compute userId
        timeSlots.getAvailableTimes(spec,(new Date(date)).getTime())
        .then(data=>timeSlots.getFreeSlots(data))
        .then(avails=>{
            var day = 0;
            avails.forEach((today,idx)=>{
                if (moment(today.date).format('YYYY-MM-DD') == moment(date).format('YYYY-MM-DD')) {
                    day = idx;
                }
            });
            avails[day].slots.forEach(slot=>{
                if (slot.start == time) {
                    bookingData.specialist = slot.specialists[0];
                }
            })
        })
        // Create booking
        .then(()=>{
            return bookingLoader.createBooking(bookingData)
        })    
        .then(id => {
            rawOutput.id = id[0].id;
            return DialogueAvailabilitiesDataLoader.getAllUserData()
        })
        .then(data => {
            // Get all reference arrays
            var professionals = DialogueAvailabilitiesDataLoader.getAllProfessionals(data);
            var locations = DialogueAvailabilitiesDataLoader.getAllLocations(data);
            var specializations = DialogueAvailabilitiesDataLoader.getAllSpecializations(data);
            
            // Use userId to find firstName, lastName and locationId in professionals
            professionals.forEach(professional=>{
                if (professional.id == bookingData.specialist) {
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
                id: rawOutput.id,
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
            return res.status(201).json(booking);
        })
        .catch(console.error);
    })
    
    // Endpoint to view a booking
    bookings.get('/:id', (req,res) => {
        var rawOutput = {}
        // Retrieve booking
        bookingLoader.getBooking({
            id: req.params.id,
            sub: req.user.sub
        })
        .then(output=>{
            console.log(output, 'output')
            rawOutput = {
                id: output[0].id,
                timeSlot: output[0].startTime,
                specialist: output[0].specialist
            }
            console.log(rawOutput)
            return DialogueAvailabilitiesDataLoader.getAllUserData()
        })
        .then(data=>{
            // Get all reference arrays
            var professionals = DialogueAvailabilitiesDataLoader.getAllProfessionals(data);
            var locations = DialogueAvailabilitiesDataLoader.getAllLocations(data);
            var specializations = DialogueAvailabilitiesDataLoader.getAllSpecializations(data);
            
            // Use userId to find firstName, lastName and locationId in professionals
            professionals.forEach(professional=>{
                if (professional.id == rawOutput.specialist) {
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
                id: rawOutput.id,
                firstName: rawOutput.firstName,
                lastName: rawOutput.lastName,
                address: rawOutput.address,
                time: rawOutput.timeSlot,
                specialization: rawOutput.specialization
            };
            
            
            // Return output
            return res.json(formattedOutput);
            
        })
        .catch(console.error)
    })

    return bookings;
};