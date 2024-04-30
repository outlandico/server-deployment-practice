'use strict';

const express = require('express');
const cors = require('cors');

// Our dependencies
const handleNotFound = require('./handlers/404');
const handleServerError = require('./handlers/500');
const timeStamp = require('./middleware/timestamp.js');
const proof = require('./middleware/proof.js');

const app = express();

app.use(cors());

// Route Definitions 
app.get('/', handleGetHome); 
app.get('/data', timeStamp, proof, handleGetData);
app.get('/broken', handleBroken);
app.get('*', handleNotFound);
app.use(handleServerError); // Using error handling middleware

// Route Handler Functions
function handleGetHome(req, res){
    console.log(req);
    res.status(200).send('Hello World');
}

function  handleGetData(req, res ) {
    let name = req.query.name;
    let age = req.query.age;
    let output = {
         name: name, 
         age: age, 
         time: req.timestamp,
         proof: req.proofofAdam
        };
    res.status(200).json(output);
}

function handleBroken( req, res, next ) {
    // Simulate an intentional error
    res.status(500).send("We broke it on purpose!");
}

// Exported Server Start Function
function start(port) {
    app.listen(port, () => {
        console.log("Listening on port " + port);
    });
}

module.exports = { app, start };
