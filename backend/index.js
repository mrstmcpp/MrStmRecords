const express = require("express");
require('dotenv').config();
const app = express();
const {Connection} = require("./database/db");
const PassPortModule = require("./passport");
const trackRoutes = require("./routes/trackRoutes");
const playlistRoutes = require("./routes/playlistRoutes");
const passport = require("passport");
const cors = require("cors");
const genreRoute = require("./routes/genreRoute");
const artistRoutes = require("./routes/artistRoutes");
const accountRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes")
const port = process.env.PORT || 5500;

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
PassPortModule();
app.get("/" , (req, res) => {
    res.send("Welcome to the server");
})

const apiVersion = "/api/v1";

app.use(`${apiVersion}/track` , trackRoutes);
app.use(`${apiVersion}/playlist` , playlistRoutes);
app.use(`${apiVersion}/genre` , genreRoute);
app.use(`${apiVersion}/artist` , artistRoutes);
app.use(`${apiVersion}/user` , accountRoutes);
app.use(`${apiVersion}/admin` , adminRoutes);

Connection();



app.listen(port, () => {
    console.log("App is running on port " + port);
})

