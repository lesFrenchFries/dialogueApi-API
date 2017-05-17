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
    
    // // OBSOLETE
    // getAllBookingsForSpecialist(specId) {
    //     return this.query(
    //         knex
    //         .select(BOOKINGS_FIELDS)
    //         .from('bookings')
    //         .where('specialist', specId)
    //         .toString()
    //     );
    // }
    
    // // OBSOLETE
    // getAllBookingsForDay(date) {
    //     return this.query(
    //         knex
    //         .select(BOOKINGS_FIELDS)
    //         .from('bookings')
    //         .where('startTime', 'like', moment(date).format('YYYY-MM-DD')+"%")
    //         .toString()
    //     );
    // }
    
    getAllBookingsForWeek(date) {
        var start = moment(date).format('YYYY-MM-DD');
        var end = moment(new Date(date.getTime()+7*24*60*60*1000)).format('YYYY-MM-DD');
        return this.query(
            knex
            .select(BOOKINGS_FIELDS)
            .from('bookings')
            .whereBetween('startTime', [start,end])
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