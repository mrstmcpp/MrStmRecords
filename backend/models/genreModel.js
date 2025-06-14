const mongo = require("mongoose");

const genre = new mongo.Schema({
    name:{
        type: String,
        required: true,
    },
    tracks:[
        {
            type: mongo.Schema.Types.ObjectId,
            ref: "Track",
        }
    ],
    description:{
        type: String,
        default: "",
    },
    artwork:{
        type: String,
        default: "",
    },
    owner:[
        {
            type: mongo.Schema.Types.ObjectId,
            ref:"Artist",
            required: true,
        }
    ]

} , {timestamps: true});

const genreModel = mongo.model("Genre" , genre);

module.exports = genreModel;