const mongo = require("mongoose");
require('dotenv').config();

const Connection = async() =>{
    try {
        await mongo.connect(process.env.MONGODB_URI);
        console.log("Database Connected Successfully.");
    } catch (error) {
        console.log("Error while connecting to database.");
    }
}

module.exports = {Connection};