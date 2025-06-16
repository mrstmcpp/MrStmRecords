const express = require("express");
const router = express.Router();
const genreModel = require("../models/genreModel");
const passport = require("passport");
const SongModel = require("../models/trackModel");
const isAdmin = require("../middlewares/isAdmin")
const genreController = require("../controllers/genreControllers");
const TrackModel = require("../models/trackModel");

router.post("/",
    passport.authenticate("jwt",
    { session: false }), 
    isAdmin , 
    genreController.createNewGenre
);
router.post("/addTrack" ,
    passport.authenticate("jwt" , {session: false}) ,
    isAdmin ,
    genreController.addTrackToGenre
);
router.get("/:genreId" , genreController.getTracksByGenre);

router.put("/:genreId" , 
    passport.authenticate("jwt" , {session : true}) , 
    isAdmin, 
    genreController.updateGenreDetails
);

router.get("/", genreController.getAllGenres);

module.exports = router;
