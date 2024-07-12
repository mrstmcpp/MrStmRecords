const mongo = require("mongoose");

const genre = new mongo.Schema({
    genreName:{
        type: String,
        required: true,
    },
    tracksName:[
        {
            type: mongo.Types.ObjectId,
            ref: "tracks",
        }
    ],
    description:{
        type: String,
        default: "",
    },
    artwork:{
        type: String,
        default: "",
    }

})

const genreModel = mongo.model("genres" , genre);

module.exports = genreModel;