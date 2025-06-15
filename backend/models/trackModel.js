const mongo = require("mongoose");
const TrackSchema = new mongo.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    artists: [
      {
        type: mongo.Schema.Types.ObjectId,
        ref: "Artist",
        required: true,
      },
    ],
    releaseDate: {
      type: Date,
      required: true,
    },
    plays: {
      type: Number,
      default: 0,
    },
    albumArt: {
      type: String,
      default: "",
    },
    genre: [
      {
        type: mongo.Schema.Types.ObjectId,
        ref: "Genre",
      },
    ],
    description: {
      type: String,
      default: "",
    },
    songType: {
      type: String,
      enum: ["Original", "Remix", "Cover"],
      default: "Original",
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const TrackModel = mongo.model("Track", TrackSchema);

module.exports = TrackModel;
