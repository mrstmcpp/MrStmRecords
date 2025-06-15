const mongo = require("mongoose");

const artistSchema = new mongo.Schema({
    user:{
        type: mongo.Schema.Types.ObjectId,
        required: true,
        ref: "User",
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    stageName: {
        type: String,
        required: true,
    },
    artistImage: {
        type: String,
        default: "https://res.cloudinary.com/dtur9xepq/image/upload/v1721457968/stmify/assets/s1wczvohzzhzzbqwisga.png",
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    socialLinks: {
        spotify: { type: String, default: '' },
        instagram: { type: String, default: '' },
        soundcloud: { type: String, default: '' },
        youtube: { type: String, default: '' },
        twitter: { type: String, default: '' },
        website: { type: String, default: '' }
    }

} , { timestamps: true })

const artistModel = mongo.model("Artist", artistSchema);

module.exports = artistModel;