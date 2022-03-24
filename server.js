// Setup empty JS object to act as endpoint for all routes
projectData = {};

console.log(projectData);

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

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
    temperature: req.body.temperature,
    date: req.body.date,
    userResponse: req.body.userResponse,
  };
  res.send(projectData);

  console.log(`Posting on server`);
  console.log(projectData);
});
