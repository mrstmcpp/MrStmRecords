const express = require("express");
const passport = require("passport");
const SongModel = require("../models/songModel");
const router = express.Router();

router.post("/create" , passport.authenticate("jwt" , {session: false}) , async(req, res) => {
    const {title , releaseDate, plays , albumArt , trackUrl} = req.body;
    if(!title || !releaseDate || !albumArt || !trackUrl){
        return res.status(301).json({error : "Insufficient details."});
    }
    const artist = req.user._id;
    const songDetails = {title , releaseDate, plays , albumArt , artist , trackUrl};
    try {
        const createdSong = await SongModel.create(songDetails);
        return res.status(200).json(createdSong);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
    

})


router.get("/mytracks" , passport.authenticate("jwt" , {session: false}) , async(req, res) => {
    const tracks = await SongModel.find({artist: req.user._id});
    return res.status(200).json({tracks});
})

//getting song by artist
router.get("/artist/:artistId" , passport.authenticate("jwt" , {session : false}) , async(req , res) => {
    const {artistId} = req.params;

    const artistExist = await SongModel.findOne({_id: artistId});
    if(!artistExist){
        return res.status(301).json({error : "Artist doesn't exist."});
    }

    const artistSong = await SongModel.find({artist: artistId});
    return res.status(200).json({data : artistSong});
})

//getting song by title
router.get("/title/:trackTitle" , passport.authenticate("jwt" , {session: false}) , async(req , res) => {
    const {trackTitle} = req.params;
    const track = await SongModel.find({title : trackTitle});
    return res.status(200).json({data : track});
})

module.exports = router;