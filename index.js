const express = require('express');
const cors = require('cors');
const mysql = require('promise-mysql');

// Express middleware
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Data loader
// const DialogueAvailabilitiesDataLoader = require('./lib/dialogue-availabilities.js');
const timeSlots = require('./timeSlots.js');
const DialogueBookingsDataLoader = require('./lib/dialogue-bookings.js');

// Controllers
const availabilities = require('./controllers/availabilities.js');
const bookings = require('./controllers/bookings.js');

const connection = mysql.createPool({user: 'root', database: 'dialogueApp'})
const bookingLoader = new DialogueBookingsDataLoader(connection);

// Express initialization
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/availabilities', availabilities(timeSlots));
app.use('/bookings', bookings(bookingLoader));


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  if (process.env.C9_HOSTNAME) {
    console.log(`Web server is listening on https://${process.env.C9_HOSTNAME}`);
  } else {
    console.log(`Web server is listening on http://localhost:${port}`);
  }
});
