const mongo = require("mongoose");
const tracks = new mongo.Schema({
    title:{
        type: String,
        required: true,
    },
    artist:{
        type: mongo.Types.ObjectId,
        ref: "user",
    },
    releasedate:{
        type: Date,
        required: true,
    },
    plays:{
        type: Int32Array,
        default: 0,
    },
    albumArt:{
        type: String,
        default: "",
    }

})

const SongModel = mongo.model("tracks" , tracks);

module.exports = SongModel;