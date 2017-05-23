const knex = require('knex')({ client: 'mysql', debug: ['ComQueryPacket'] });
const util = require('./util');
const moment = require('moment');

const BOOKINGS_FIELDS = ['id','startTime','endTime','specialist'];
const BOOKINGS_WRITE_FIELDS = ['sub', 'startTime', 'endTime', 'location', 'specialist'];

class DialogueBookingsDataLoader {
    constructor(conn) {
        this.conn = conn;
    }
    
    query(sql) {
        return this.conn.query(sql);
    }

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
        )
        .then(result => {
            return this.query(
            knex
            .select(BOOKINGS_FIELDS)
            .from('bookings')
            .where('id', result.insertId)
            .toString()
          );
        })
    }
    
    getBooking(input) {
        var id = input.id;
        var sub = input.sub;

        return this.query(
            knex
            .select(BOOKINGS_FIELDS)
            .from('bookings')
            .where({
                id: id,
                sub: sub
            })
            .toString()
        )
    }
    
    getAllBookingsForPatient(sub) {
        return this.query(
            knex
            .select(BOOKINGS_FIELDS)
            .from('bookings')
            .where('sub', sub)
            .orderBy('startTime', 'asc')
            .toString()
        )
    }
}

module.exports = DialogueBookingsDataLoader;