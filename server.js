// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();
// app.use(express.json());  // do the same as Middleware as app.use(bodyParser.json());

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 5000;
app.listen(port, () =>
  console.log(`server is running at localhost:${port}`)
);

// get route on '/get'
app.get("/get", (req, res) =>
  res.status(200).send(projectData)
);

// post route on '/add'
app.post("/add", (req, res) => {
  projectData = {
    city: req.body.city,
    temp: req.body.temp,
    date: req.body.date,
    userResponse: req.body.userResponse,
    weatherStatus: req.body.weatherStatus,
  };
  res.send(projectData);

  console.log(`Posting on server`);
  console.log(projectData);
});

app.get("/all", (req, res) =>
  res.status(200).send(projectData)
);

/*
	DotEnv
*/

require("dotenv").config();

// get request to send
app.get("/apikey", (req, res) => {
  res.send({
    key: process.env.APIKEY,
  });
});

console.log(process.env.APIKEY);
