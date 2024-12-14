require("dotenv").config()  // Import dotenv and configure it

const express = require("express")  // Import express

const app = express()  // Create an express app
const port = process.env.PORT || 3000  // Set the port to 3000 or the port specified in the .env file

app.listen(port, () => {
    console.log(`server is running on port ${port}`);  // Log the port the server is running on
    
})

app.get("/", (req, res) => {
    res.send("Hello World")  // Send "Hello World" to the client
})

