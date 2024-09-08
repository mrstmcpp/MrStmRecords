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

// 
// mongodb+srv://mrstmcpp:mrstmcpp@stmdb.bpxby.mongodb.net/?retryWrites=true&w=majority&appName=StmDB
// ?proxyHost=172.31.102.29&proxyPort=3128&proxyUsername=edcguest&proxyPassword=edcguest