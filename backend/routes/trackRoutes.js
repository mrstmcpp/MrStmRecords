const express = require("express");
const passport = require("passport");
const SongModel = require("../models/songModel");
const router = express.Router();

router.post("/create" , passport.authenticate("jwt" , {session: false}) , async(req, res) => {
    const {title , releaseDate, plays , albumArt} = req.body;
    if(!title || !releaseDate || !albumArt){
        return res.status(301).json({error : "Insufficient details."});
    }
    const artist = req.user._id;
    const songDetails = {title , releaseDate, plays , albumArt , artist};
    const createdSong = await SongModel.create(songDetails);
    return res.status(200).json(createdSong);

})


router.get("/tracks/mytracks" , passport.authenticate("jwt" , {session: false}) , async(req, res) => {
    const tracks = await SongModel.find({artist: req.user._id});
    return res.status(200).json({tracks});
})


module.exports = router;