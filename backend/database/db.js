const mongo = require("mongoose");

const Connection = async() =>{
    try {
        await mongo.connect("mongodb://localhost:27017/stmify");
        console.log("Database Connected Successfully.");
    } catch (error) {
        console.log("Error while connecting to database.");
    }
}

module.exports = {Connection};