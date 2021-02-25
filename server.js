const express = require("express");

//instantiate the server
const app = express();
//use 3001 - if not, default to 80 
const PORT = process.env.PORT || 3001;

//parse incoming string or array data - takes POST data and converts it to key/value pairing
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());
//provide a file path to a location and makes these static resources
app.use(express.static(__dirname));

//get routes 
require('./routes/routes.js')(app);

//make server listen 
app.listen(PORT, function() {
    console.log(`API server now on port ${PORT}!`);
});  