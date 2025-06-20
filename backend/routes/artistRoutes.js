const express = require("express");
const passport = require("passport");
const router = express.Router();
const ArtistController = require("../controllers/artistController");
const TrackController = require("../controllers/trackController");

router.post("/" , passport.authenticate("jwt", {session: false}),
    ArtistController.createNewArtist
);

router.get("/:id" , ArtistController.getArtistDetailsPublic);

router.get("/:id/tracks" , TrackController.getTrackByArtist);

router.get("/" , ArtistController.getAllArtists);


module.exports = router;