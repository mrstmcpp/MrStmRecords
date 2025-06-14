const mongo = require("mongoose");

const playlistSchema = new mongo.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        default: "",
    },
    likeCount:{
        type: Number,
        default: 0,
    },
    artwork:{
        type: String,
        default: "",
    },
    tracks:[
        {
            type: mongo.Schema.Types.ObjectId,
            ref: "Track",
        }
    ],
    owner:[
        {
            type: mongo.Schema.Types.ObjectId,
            ref: "Artist",
            required: true,
        }
    ]
})

const playlistModel = mongo.model("Playlist" , playlistSchema);

module.exports = playlistModel;