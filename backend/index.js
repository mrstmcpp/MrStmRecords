const express = require("express");
const app = express();
const port = 8080;
const {Connection} = require("./database/db");
const PassPortModule = require("./passport");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");


app.use(express.json());
app.get("/" , (req, res) => {
    res.send("Welcome to the server");
})

app.use("/auth" , authRoutes);
app.use("/song" , trackRoutes);


Connection();

PassPortModule();

app.listen(port, () => {
    console.log("App is running");
})

