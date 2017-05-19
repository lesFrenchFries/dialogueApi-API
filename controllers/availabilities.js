const express = require('express');

module.exports = (timeSlots) => {
    const availabilities = express.Router();
    
    availabilities.get('/', (req, res) => {
        var spec = req.query.spec;
        var date = (new Date(req.query.date)).getTime();
        timeSlots.getAvailableTimes(spec,date)
        .then(data=>timeSlots.getFreeSlots(data))
        .then(data=>{
            var output1 = data.map(day=>{
                var output2 = {
                    date: day.date,
                    slots: day.slots.map(slot=>{
                        return {
                            start: slot.start,
                            end: slot.end
                        };                        
                    })
                }
                return output2;
            })
            return res.json(output1)
        })
        .catch(console.error);
    })

    return availabilities;
};