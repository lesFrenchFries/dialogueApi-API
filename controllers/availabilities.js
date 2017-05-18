const express = require('express');

module.exports = (timeSlots) => {
    const availabilities = express.Router();
    
    availabilities.get('/availabilities', (req, res) => {
        var spec = req.body.spec;
        var date = req.body.date;
        timeSlots.getAvailableTimes(spec,date)
        .then(data=>timeSlots.getFreeSlots(data))
        .then(data=>res.json(data))
        .catch(alert);
    })

    return availabilities;
};