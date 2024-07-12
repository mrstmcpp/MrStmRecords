const mongo = require("mongoose");

const playlist = new mongo.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        default: "",
    },
    owner:{
        type: mongo.Types.ObjectId,
        ref: "userdata",
    },
    likedCount:{
        type: Number,
        default: 0,
    },
    artwork:{
        type: String,
        default: "",
    },
    tracks:[
        {
            type: mongo.Types.ObjectId,
            ref: "tracks",
        }
    ],
    collabrators:[
        {
            type: mongo.Types.ObjectId,
            ref: "userdata",
        }
    ]
})

const playlistModel = mongo.model("playlists" , playlist);

module.exports = playlistModel;