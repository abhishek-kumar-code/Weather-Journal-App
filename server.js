// Setup empty JS object to act as endpoint for all routes
const projectData = [];

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser')

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
/* Spin up the server*/
const server = app.listen(port, listening);
 function listening(){
    console.log(`Running on localhost: ${port}`);
  };

// POST ROUTE
app.post('/addWeather', addData);

function addData(req,res){
  //console.log(req.body);
  newEntry = {
    date: req.body.date,
    temperature: req.body.temperature,
    userfeel: req.body.userfeel
  }

  projectData.push(newEntry)
  res.send(projectData)
  console.log(projectData)
}

// GET ROUTE
app.get('/all', getData)

function getData(req,res){
  res.send(projectData)
  console.log(projectData)
}