const express = require("express");
const passport = require("passport");
const playlistModel = require("../models/playlistModel");
const UserModel = require("../models/artistModel");
const SongModel = require("../models/trackModel");
const router = express.Router();
const PlaylistController = require("../controllers/playlistController")

router.post("/" , 
    passport.authenticate("jwt" , {session: false}),
    PlaylistController.createNewPlaylist
)

router.get("/:playlistId" , PlaylistController.getPlaylistTracks);

router.put("/:playlistId" , 
    passport.authenticate("jwt" , {session: false}),
    PlaylistController.updatePlaylist
)

router.post("/:playlistId/add-track" , 
    passport.authenticate("jwt" , {session: false}),
    PlaylistController.addTrackToPlaylist
)
module.exports = router;