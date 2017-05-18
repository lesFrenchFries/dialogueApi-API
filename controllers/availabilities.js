const express = require('express');

module.exports = (timeSlots) => {
    const availabilities = express.Router();
    
    availabilities.get('/', (req, res) => {
        console.log(req.user);
        var spec = req.query.spec;
        var date = (new Date(req.query.date)).getTime();
        timeSlots.getAvailableTimes(spec,date)
        .then(data=>timeSlots.getFreeSlots(data))
        .then(data=>res.json(data))
        .catch(console.error);
    })

    return availabilities;
};