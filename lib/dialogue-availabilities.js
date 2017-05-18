const api_link = 'https://api.wheniwork.com';
const api_key = '86c6930065b9467f4e95c5d28522804ea12ef859';
const username = 'sinriver413@hotmail.com';
const password = 'hunter2hunter2';
const login_token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOjEsImxvZ2luIjoiOTI4MTQyNiIsInBpZCI6IjkyODE0MjYifQ.Kp_cecg9AAFH7KCMYdgBaSko1TxMQMVgWWXrcK-NewBgAjQ_yejhpRg8LxOG2Bc2CJhhg-9Q013akmT-52xjWBe03q5B3u10B3wPbPrRyPVrrTOfSy9VK8mmTBzgkPD-ua6nLwEm_wC6LoVW1k53hd1ZM7YFVjnpfWD5NtN632Hrq3bKTFyR8rsXVjzShyAkBqUJzYN9O8q5WguByYFHgihffMAqCuG96n7izGwBfh1BcC-jXPQIWAc77ZemZWss3WigAlvy8jBbNuNHpOOA-wrFYiUXj54fA2Pkjmkubcn1LRoKYxd7Gw6z-3aEEa3-nXxCK6ynFypzHbnnGk_q7w';

const fetch = require('node-fetch');

const BOOKINGS_FIELDS = ['staetTime','endTime'];
const BOOKINGS_WRITE_FIELDS = ['token', 'startTime', 'endTime', 'location', 'specialization'];

/*
var shifts = [{
      "id": 10000,
      "account_id": 10000,
      "user_id": 101,
      "location_id": 1045,
      "position_id": 5447674,
      "site_id": 4351,
      "start_time": "Fri, 07 Mar 2014 08:00:00 -0600",
      "end_time": "Fri, 07 Mar 2014 14:00:00 -0600",
      "break_time": 0.5,
      "color": "cc0000",
      "notes": "We need more cowbell.",
      "instances": 1,
      "published": true,
      "published_date": "Thu, 06 Mar 2014 22:17:14 -0600",
      "notified_at": null,
      "created_at": "Thu, 06 Mar 2014 21:12:14 -0600",
      "updated_at": "Thu, 06 Mar 2014 22:17:14 -0600",
      "acknowledged": 0,
      "acknowledged_at": "",
      "creator_id": 101,
      "is_open": null
    },
    {
      "id": 27384,
      "account_id": 10000,
      "user_id": 101,
      "location_id": 1045,
      "position_id": 19483,
      "site_id": 4351,
      "start_time": "Sat, 08 Mar 2014 09:00:00 -0600",
      "end_time": "Sat, 08 Mar 2014 17:00:00 -0600",
      "break_time": 0.5,
      "color": "cc0000",
      "notes": "We need more cowbell.",
      "instances": 1,
      "published": true,
      "published_date": "Thu, 06 Mar 2014 22:17:14 -0600",
      "notified_at": null,
      "created_at": "Thu, 06 Mar 2014 21:12:14 -0600",
      "updated_at": "Thu, 06 Mar 2014 22:17:14 -0600",
      "acknowledged": 0,
      "acknowledged_at": "",
      "creator_id": 101,
      "is_open": null
}];

var testShiftData = {
    "start": "Wed, 05 Mar 2014 00:00:00 -0600",
    "end": "Sat, 08 Mar 2014 23:59:59 -0600",
    "shifts": shifts
}
*/



class DialogueAvailabilitiesDataLoader {
    
    // Fetch data on all data on USERS
    getAllUserData() {
        return fetch(`${api_link}/2/users`, {
            headers: {"W-Token": login_token}
        })
        .then(response => response.json())
        .then(data => data);
    }
    
    // Get info on all professionals
    getAllProfessionals(data) {
        return data.users.map(user => {
            return {
                id: user.id, 
                specId: user.positions,
                firstName: user.first_name,
                lastName: user.last_name,
                locationId: user.locations
                //email? do we notify him if booked?
            }
        });
    }
    
    // Get all specializations and their ID's
    getAllSpecializations(data) {
        return data.positions.map(position => { 
            return {
                spec: position.name,
                id: position.id
            }
        });
    }
    
    // Get all locations and their ID's
    getAllLocations(data) {
        return data.locations.map(location => { 
            return {
                name: location.name,
                id: location.id,
                address: location.address,
                coordinates: location.coordinates
            }
        });
    }
    
    // Get all shifts for a given range, for a given location
    getAllShifts(startDate,endDate) {
        return fetch(`${api_link}/2/shifts?start=${startDate}&end=${endDate}`, {
            headers: {"W-Token": login_token}
        })
        .then(response => response.json())
        .then(data => {
            var shifts = data.shifts;
            // shifts = testShiftData.shifts; // MOCK DATA
            return shifts.map(shift => {
                return {
                    startTime: shift.start_time,
                    endTime: shift.end_time,
                    id: shift.id,
                    specId: shift.position_id,
                    userId: shift.user_id,
                    location: shift.location_id
                }
            })
        });
    }
    
    // Get all shifts for a give specialization
    getAllShiftsForSpecialization(shifts,specId) {
        function isProfession(shift) {
            return shift.specId == specId;
        }
        return shifts.filter(isProfession);
    }
    
    getSpecialistFromId(specialists,id) {
        var appointedSpecialist;
        specialists.forEach(specialist=>{
            if (specialist.id == id) {
                appointedSpecialist = specialist;
            }
        })
        return appointedSpecialist;
    }
    
}

module.exports = new DialogueAvailabilitiesDataLoader();