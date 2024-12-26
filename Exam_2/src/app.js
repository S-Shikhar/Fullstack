require("dotenv").config()  // Import dotenv and configure it

const express = require("express")  // Import express

const app = express()  // Create an express app
const port = process.env.PORT || 3000  // Set the port to 3000 or the port specified in the .env file
const path = require("path")  // Import path
const bodyParser = require("body-parser")  // Import body-parser
const conn = require("./db/conn")  // Import the connection file
const User = require("./models/user")  // Import the user model

app.set("view engine", "hbs")  // Set the view engine to handlebars
app.set("views", path.join(__dirname, "../templates/views"))  // Set the views directory

app.use(bodyParser.urlencoded({extended: false}))  // Use body-parser to parse urlencoded data
app.use(bodyParser.json())  // Use body-parser to parse json data

app.listen(port, () => {
    console.log(`server is running on port ${port}`);  // Log the port the server is running on
    
})

app.get("/", (req, res) => {
    res.send("Hello World")  // Send "Hello World" to the client
})

app.get("/index", (req,res) => {
    res.render("index")  // Render the index.hbs file
})

app.post("/login", (req, res) => {
    console.log(req.body.email)
    console.log(req.body.pass)

    const user = new User({
        email: req.body.email,
        pass: req.body.pass
    })

    user.save()
    res.render("index")  // Render the index.hbs file~
})