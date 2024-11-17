const express = require("express");
const hbs = require("hbs");
const path = require("path");

const app = express();
const port = 3200 || process.env.port;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));

app.listen(port, () => {
    console.log(`server is runnng on portL: ${port}`);   
});

