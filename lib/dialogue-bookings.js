const knex = require('knex')({ client: 'mysql', debug: ['ComQueryPacket'] });
const util = require('./util');
const moment = require('moment');

const BOOKINGS_FIELDS = ['startTime','endTime','specialist'];
const BOOKINGS_WRITE_FIELDS = ['token', 'startTime', 'endTime', 'location', 'specialist'];

class DialogueBookingsDataLoader {
    constructor(conn) {
        this.conn = conn;
    }
    
    query(sql) {
        return this.conn.query(sql);
    }
    
    // Methods
    getAllBookingsForSpecialist(specId) {
        return this.query(
            knex
            .select(BOOKINGS_FIELDS)
            .from('bookings')
            .where('specialist', specId)
            .toString()
        );
    }
    
    getAllBookingsForDay(date) {
        return this.query(
            knex
            .select(BOOKINGS_FIELDS)
            .from('bookings')
            .where('startTime', 'like', moment(date).format('YYYY-MM-DD')+"%")
            .toString()
        );
    }
    
    createBooking(bookingData) {
        return this.query(
            knex
            .insert(util.filterKeys(BOOKINGS_WRITE_FIELDS, bookingData))
            .into('bookings')
            .toString()
        );
    }
    
}

module.exports = DialogueBookingsDataLoader;