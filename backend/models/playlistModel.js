const mongo = require("mongoose");

const playlist = new mongo.Schema({
    name:{
        type: String,
        required: true,
    },
    owner:{
        type: mongo.Types.ObjectId,
        ref: "user",
    },
    likedCount:{
        type: Int32Array,
        default: 0,
    },
    artwork:{
        type: String,
        default: "",
    },
    tracks:[
        {
            type: mongo.Types.ObjectId,
            ref: "song",
        }
    ],
    collabrators:[
        {
            type: mongo.Types.ObjectId,
            ref: "user",
        }
    ]
})

const playlistModel = mongo.model("playlists" , playlist);

module.exports = playlistModel;