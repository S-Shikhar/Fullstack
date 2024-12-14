const mongoose = require("mongoose")
require("dotenv").config()

const newworn = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// Create a database
mongoose.connect(process.env.mongoURI, newworn)
    .then(() => {
        console.log("Database connected successfully")
    })
    .catch((err) => {
        console.log("Database not connected")
    })