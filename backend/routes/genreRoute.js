const express = require("express");
const router = express.Router();
const passport = require("passport");
const isAdmin = require("../middlewares/isAdmin")
const genreController = require("../controllers/genreControllers");

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
