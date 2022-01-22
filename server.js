const express = require('express');
const path = require('path');
// Loads env variables
require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 3001;
// Adds json parsing middleware
app.use(express.json());
// Setup static directory to serve
app.use(express.static(path.resolve('client', 'build')));
// Creates weather endpoint

app.get('*', (req, res) => {
    res.sendFile(path.resolve('frontend', 'build', 'index.html'));
});
// console.log that your server is up and running
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
