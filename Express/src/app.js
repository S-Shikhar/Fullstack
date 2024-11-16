// Importing the required modules
const express =require("express");
const hbs = require("hbs");
const path = require("path");
const bodyParser = require("body-parser");
const register = require("./models/register");
const conn = require("./db/conn");

// Creating an express app
const app = express();
const port = 3400 || process.env.PORT;

// Database connection
conn();

// Setting the view engine
app.set("view engine", "hbs");

// Setting the path for views
app.set("views", path.join(__dirname, "../templates/views"));

// Setting the path for partials
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

// Setting the path for static files
app.use("/css", express.static(path.join(__dirname, "../templates/assets/css")));
app.use("/js", express.static(path.join(__dirname, "../templates/assets/js")));
app.use("/img", express.static(path.join(__dirname, "../templates/assets/img")));

// Parsing the data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


