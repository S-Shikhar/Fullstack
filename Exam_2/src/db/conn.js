require("dotenv").config()  // Import dotenv and configure it

const mongoose = require("mongoose")

const newWorn = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

mongoose.connect(process.env.mongo, newWorn)
    .then(() => {
        console.log("Connection Successful");
    })
    .catch((err) => {
        console.log(err);
    })