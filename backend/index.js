const express = require("express");
const app = express();
const port = 8080;
const {Connection} = require("./database/db");
const PassPortModule = require("./passport");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const playlistRoutes = require("./routes/playlistRoutes");
const passport = require("passport");
const cors = require("cors");
const genreRoute = require("./routes/genreRoute");

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


Connection();



app.listen(port, () => {
    console.log("App is running");
})

