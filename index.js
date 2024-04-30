'use strict';
// read the .env file and set prcoess.env.VAR in the environment
require('dotenv').config();

// Import our "server module"
const server = require('./server.js');

// start up a server!
server.start(process.env.PORT);