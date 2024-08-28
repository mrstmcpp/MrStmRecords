const mongo = require("mongoose");

const AccountSchema = new mongo.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
        private: true,
    },
})

const AccountModel = mongo.model("accounts" , AccountSchema);

module.exports = AccountModel;