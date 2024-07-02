const express = require("express");
const app = express();
const port = 8080;

const {Connection} = require("./database/db");
const PassPortModule = require("./passport");

app.get("/" , (req, res) => {
    res.send("Welcome to the server");
})


Connection();

PassPortModule();

app.listen(port, () => {
    console.log("App is running");
})

