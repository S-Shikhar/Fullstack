const express = require("express");
const hbs = require("hbs");
const path = require("path");
const dotenv = require("dotenv").config();

const app = express();
const port = 3200 || process.env.port;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));

app.listen(port, () => {
    console.log(`server is runnng on port http://localhost:${port}`);   
    console.log(`Server started at http://localhost:${port}`);
});

