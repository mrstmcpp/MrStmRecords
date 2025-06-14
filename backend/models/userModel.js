const mongoose = require("mongoose");

const UserAccount = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match:[
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
        "Please provide a valid email address"
    ]
  },
  password: {
    type: String,
    required: true,
  },
  followedArtists: [
    {
      artists: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist",
      },
    },
  ],

  liked:[
    {
      itemId:{
        type: mongoose.Schema.Types.ObjectId,
        refPath: "likedItems.itemType",
      },
      itemType:{
        type: String,
        required: true,
        enum: ["Track" , "Playlist"],
      }
    }
  ]
} , {timestamps : true});

const UserModel = mongoose.model("User", UserAccount);

module.exports = UserModel;
