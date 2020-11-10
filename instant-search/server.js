const express = require('express');
const app = express('app');
const server = require('http').Server(app);

// allow accessing diffrent domain 
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// Reading a JSON file: First Method ▼ ▼ ▼ ▼ ▼ ▼ ▼
const data = require('../users.json');
data; //log the data


// Reading a JSON file: Second Method ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ 
const fs = require("fs");

// Read users.json file
fs.readFile("../users.json", function (err, data) {
    // Check for errors 
    if (err) throw err;
    // Converting to JSON 
    const users = JSON.parse(data);
    users; // Print users  
});



app.get('/', (req, res) => {
    res.send('Working..');
});

app.get('/search', (req, res, next) => {
    // console.log(req.query.q);
    res.send({ 'asdf': 5 })
});
// express deprecated req.param(name): Use req.params, req.body, or req.query instead server.js

app.listen(3030);