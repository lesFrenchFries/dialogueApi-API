const express = require('express');
const cors = require('cors');
const mysql = require('promise-mysql');

// Express middleware
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Controllers
const bookingsController = require('./controllers/bookings.js');
const availabilitiesController = require('./controllers/availabilities.js');