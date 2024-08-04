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
    stageName:{
        type: String,
        required: true,
    },
    artistImage:{
        type: String,
        default: "https://res.cloudinary.com/dtur9xepq/image/upload/v1721457968/stmify/assets/s1wczvohzzhzzbqwisga.png",
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
    bio: {
        type: String,
        required: false,
    }
})

const UserModel = mongo.model("userdata" , userSchema);

module.exports = UserModel;