const knex = require('knex')({ client: 'mysql', debug: ['ComQueryPacket'] });
const util = require('./util');

const BOOKINGS_FIELDS = ['startTime','endTime'];
const BOOKINGS_WRITE_FIELDS = ['token', 'startTime', 'endTime', 'location', 'specialization'];

class DialogueBookingsDataLoader {
    constructor(conn) {
        this.conn = conn;
    }
    
    query(sql) {
        return this.conn.query(sql);
    }
    
    // Methods
    getAllBookingsForSpecialization(spec) {
        return this.query(
            knex
            .select(BOOKINGS_FIELDS)
            .from('bookings')
            .where('specialization', spec)
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