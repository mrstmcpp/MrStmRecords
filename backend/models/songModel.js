const mongo = require("mongoose");
const tracks = new mongo.Schema({
    title:{
        type: String,
        required: true,
    },
    trackUrl:{
        type: String,
        required: true,
    },
    artist:{
        type: mongo.Types.ObjectId,
        ref: "userdata",
    },
    releaseDate:{
        type: Date,
        required: true,
    },
    plays:{
        type: Number,
        default: 0,
    },
    albumArt:{
        type: String,
        default: "",
    },
    genre:{
        type: String,
        default: "",
    },
    description:{
        type : String,
        default: "",
    },
    songType:{
        type: String,
        default: "Original",
    }

})

const SongModel = mongo.model("tracks" , tracks);

module.exports = SongModel;