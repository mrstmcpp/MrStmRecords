const mongo = require("mongoose");

const AlbumSchema = new mongo.Schema({
    name:{
        type: String,
        required: true,
    },
    albumArt:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        default: "",
    },
    artists:[
        {
            type: mongo.Schema.Types.ObjectId,
            ref: "Artist",
            required: true,
        }
    ],
    tracks:[
        {
            type: mongo.Schema.Types.ObjectId,
            ref: "Track",
            required: true,
            min: [3 , 'Minimum 3 tracks should be included.']
        }
    ]
    
}, {timestamps : true});

const AlbumModel = new mongo.model("Album" , AlbumSchema);

module.exports = AlbumModel;