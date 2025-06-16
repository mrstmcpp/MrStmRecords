const mongo = require("mongoose");

const playlistSchema = new mongo.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    likeCount: {
        type: Number,
        default: 0,
    },
    artwork: {
        type: String,
        default: "",
    },
    tracks: [
        {
            type: mongo.Schema.Types.ObjectId,
            ref: "Track",
        },
    ],
    artistOwners: [
        { 
            type: mongo.Schema.Types.ObjectId, 
            ref: "Artist" 
        }
    ],
    userOwners: [
        { 
            type: mongo.Schema.Types.ObjectId, 
            ref: "User" 
        }
    ],
});

const playlistModel = mongo.model("Playlist", playlistSchema);

module.exports = playlistModel;
