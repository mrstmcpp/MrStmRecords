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

// 
// mongodb+srv://mrstmcpp:mrstmcpp@stmdb.bpxby.mongodb.net/?retryWrites=true&w=majority&appName=StmDB
// ?proxyHost=172.31.102.29&proxyPort=3128&proxyUsername=edcguest&proxyPassword=edcguests