const express = require("express");
const passport = require("passport");
const playlistModel = require("../models/playlistModel");
const UserModel = require("../models/userModel");
const SongModel = require("../models/songModel");
const router = express.Router();

router.post("/create", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { name, tracks, artwork, description } = req.body;
    if (!name || !tracks || !artwork) {
        return res.status(301).json({ error: "Insufficient details provided." });
    }
    const currentUser = req.user;

    const playlistPayload = {
        name,
        owner: currentUser._id,
        artwork,
        tracks,
        collabrators: [],
        description,
    }

    const playlistDetails = await playlistModel.create(playlistPayload);
    return res.status(200).json(playlistDetails);

})

router.get("/id/:playlistId", async (req, res) => {
    const playlistId = req.params.playlistId;
    const playlistToShow = await playlistModel.findOne({ _id: playlistId }).populate({
        path: "tracks",
        populate: {
            path: "artist",
            select: "stageName", 
            model: "userdata"
        }
    });
    if (!playlistToShow) {
        return res.status(301).json({ error: "Doesn't exist." })
    }
    return res.status(200).json(playlistToShow.tracks);
})



router.get("/artist/:artistId", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const artistId = req.params.artistId;
    const artistExistence = await UserModel.findOne({ _id: artistId });
    if (!artistExistence) {
        return res.status(301).json({ error: "Invalid Artist." });
    }
    
    const playlistToShow = await playlistModel.find({ owner: artistId });

    return res.status(200).json({ data: playlistToShow });

});


router.post("/add/song", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const currentUser = req.user;
    const { playlistId, songId } = req.body;

    console.log("Current User:", currentUser);
    console.log("Playlist ID:", playlistId);
    console.log("Song ID:", songId);

    const playlist = await playlistModel.findOne({ _id: playlistId });
    if (!playlist) {
        return res.status(301).json({ error: "Playlist doesn't exist." });
    }

    

    if (playlist.owner.toString() !== currentUser._id.toString() && !playlist.collaborators.includes(currentUser._id.toString())) {
        return res.status(400).json({ error: "You are not allowed." });
    }

    const song = await SongModel.findOne({ _id: songId });
    if (!song) {
        return res.status(301).json({ error: "Song doesn't exist." });
    }
    
    playlist.tracks.push(songId);
    await playlist.save();
    return res.status(200).json(playlist);
})


router.get("/myplaylists", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const playlists = await playlistModel.find({ owner: req.user._id }).populate("owner");;
    return res.status(200).json({ playlists });
})

router.get("/name/:playlistId" , async(req, res) => {
    const playlistId = req.params.playlistId;
    const playlistName = await playlistModel.findOne({_id : playlistId}).select("name");;
    return res.status(200).json({ name: playlistName.name });
})

router.get("/allPlaylist", async (req, res) => {
    const playlists = await playlistModel.find({});
    return res.status(200).json({ playlists });
})

module.exports = router;