const express = require("express");
const UserModel = require("../models/artistModel");
const SongModel = require("../models/trackModel");
const passport = require("passport");
const isArtist = require("../middlewares/isArtist");
const router = express.Router();
const ArtistController = require("../controllers/artistController");
const TrackController = require("../controllers/trackController");

router.post("/" , passport.authenticate("jwt", {session: false}),
    ArtistController.createNewArtist
);

router.get("/:id" , ArtistController.getArtistDetailsPublic);

router.get("/:id/tracks" , TrackController.getTrackByArtist);


module.exports = router;