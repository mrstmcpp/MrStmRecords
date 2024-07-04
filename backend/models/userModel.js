const mongo = require("mongoose");

const userSchema = new mongo.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
    },
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
        private: true,
    }
})

const UserModel = mongo.model("userdata" , userSchema);

module.exports = UserModel;