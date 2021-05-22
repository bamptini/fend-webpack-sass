// Setup empty JS object to act as endpoint for all routes
weatherData = {};

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const app = express()

app.use(express.static('dist'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})



//------- GET route Returns journalData object
app.get('/all', getData); //Get feeling data when index URI is used

function getData (request, response){
    response.send(weatherData); //send response to endpoint (object)
    console.log(weatherData);
};

//--------POST ROUTE-------------------------
app.post('/all', postData); //URL needs to be defined #IMPORTANT URL CHANGE

function postData (request, response) {

    let data = request.body;

console.log('POST Update to server ', data);

weatherData["temp"] = data.temp;
weatherData["city"] = data.location;

response.send(weatherData);
};

//-------END POST ROUTE---------------------



