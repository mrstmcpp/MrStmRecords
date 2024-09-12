const express = require("express");
require('dotenv').config();
const app = express();
const {Connection} = require("./database/db");
const PassPortModule = require("./passport");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const playlistRoutes = require("./routes/playlistRoutes");
const passport = require("passport");
const cors = require("cors");
const genreRoute = require("./routes/genreRoute");
const artistRoutes = require("./routes/artistRoutes");
const accountRoutes = require("./routes/acccountRoutes");
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
PassPortModule();
app.get("/" , (req, res) => {
    res.send("Welcome to the server");
})

app.use("/auth" , authRoutes);
app.use("/song" , trackRoutes);
app.use("/playlist" , playlistRoutes);
app.use("/genre" , genreRoute);
app.use("/artist" , artistRoutes);
app.use("/account" , accountRoutes);


Connection();



app.listen(port, () => {
    console.log("App is running");
})

