const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require("helmet");

// Loads env variables
require('dotenv').config()
const app = express();
app.use(helmet());
const PORT = process.env.PORT || 3001;
// Adds json parsing middleware
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(bodyParser.json());
// Setup static directory to serve
app.use(express.static(path.resolve('client', 'build')));
// Creates weather endpoint

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
// console.log that your server is up and running
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
