const express = require("express");
const passport = require("passport");
const SongModel = require("../models/songModel");
const User = require("../models/artistModel");
const UserModel = require("../models/artistModel");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/create", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { title, releaseDate, plays, albumArt, trackUrl, genre } = req.body;
    if (!title || !releaseDate || !albumArt || !trackUrl || !genre) {
        return res.status(301).json({ error: "Insufficient details." });
    }
    const artist = req.user._id;
    const songDetails = { title, releaseDate, plays, albumArt, artist, trackUrl, genre };
    try {
        const createdSong = await SongModel.create(songDetails);
        return res.status(200).json(createdSong);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }


})


router.get("/mytracks", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const tracks = await SongModel.find({ artist: req.user._id }).populate("artist");
    return res.status(200).json({ tracks });
})

router.get("/genre/:genreId", async (req, res) => {
    const { genreId } = req.body;

    const genreWiseTracks = await SongModel.find({ genre: genreId });
    return res.status(200).json({ genreWiseTracks });
})




//getting song by title
router.get("/id/:trackID", async (req, res) => {
    const { trackID } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(trackID)) {
      return res.status(400).json({ error: "Invalid track ID" });
    }
  
    try {
      const track = await SongModel.findOne({ _id: trackID }).populate("artist");
  
      if (!track) {
        return res.status(404).json({ error: "Track not found" });
      }
      const relatedTracks = await SongModel.find({
        $or: [
          { artist: track.artist._id },
          { genre: track.genre }
        ],
        _id: { $ne: trackID }
      }).limit(5).populate("artist");

      return res.status(200).json({track , relatedTracks});
    } catch (error) {
      console.error("Error fetching track:", error);
      return res.status(500).json({ error: "Server error" });
    }
  });


router.get("/getallsongs", async (req, res) => {
    try {
        const tracks = await SongModel.find({}).populate("artist");
        return res.status(200).json(tracks);
    } catch (error) {
        console.log("Error while fetching the songs :" , error);
        return res.status(500).json({message : "Failed to fetch songs."});
    }

})



module.exports = router;