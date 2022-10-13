// Setup empty JS object to act as endpoint for all routes
projectData = {};

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
app.use(express.static('website'));

// Setup Server
// function to complete GET /all
const gettingAll = (req, res) => res.status(200).send(projectData);
app.get("/all", gettingAll);

//function to complete post /add
const dataPost = (req, res) => {
    projectData = req.body;
    console.log(projectData);
    res.status(200).send(projectData);
}
app.post("/add", dataPost);

const port = 4800;
const hostname = "localHost";

const listening = () =>
console.log(`The Server is running on http://${hostname}:${port}/`);

app.listen(port, listening);