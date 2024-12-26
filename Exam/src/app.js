require("dotenv").config()

const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const path = require("path")
const bodyParser = require("body-parser")
const hbs = require("hbs")
const conn = require("./db/conn")
const User = require("./models/user")

// Set up static directory to serve hbs files from public directory 
app.set("view engine", "hbs")   // Set view engine to handlebars
app.set("views", path.join(__dirname, "../templates/views"))  // Set views directory

// take the data from the form and parse it into a json object
app.use(bodyParser.urlencoded({ extended: false }))  // Parse URL-encoded bodies (as sent by HTML forms) 
app.use(bodyParser.json())  // Parse JSON bodies (as sent by API clients) 

hbs.registerPartials(path.join(__dirname, "../templates/partials"))  // Set partials directory
// hbs.registerPartial("header", "{{header}}")  // Set header partial


// Set up static directory to serve css files from public directory
app.use("/css", express.static(path.join(__dirname, "../templates/assets/css")))
app.use("/js", express.static(path.join(__dirname, "../templates/assets/js"))) 



// listen to the server on port 3000 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

// Set up routes 
app.get("/", (req, res) => {
    // res.send("Hello World")
    res.render("index")
})

app.get("/login", (req, res) =>{
    res.render("form")
})

app.post("/login", (req, res) => {
    console.log(req.body.email);
    console.log(req.body.pass);

    // Create a new user object and pass the email and password to it from the form 
    const newUser = new User({
        email: req.body.email,
        pass: req.body.pass
    })

    // Save the user to the database
    newUser.save()
        .then(() => {
            console.log("User saved successfully");            
        })
        .catch((err) => {
            console.log("User not saved");            
        })

    res.render("form")
})

app.get("/about", (req, res) => {
    res.render("about")
})

app.get("/users", (req, res) => {
    res.render("users")
})