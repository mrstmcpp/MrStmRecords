const express = require("express");
const router = express.Router();
const passport = require("passport")
const isAdmin = require("../middlewares/isAdmin");
const AlbumController = require("../controllers/albumController")

router.post("/" ,
    passport.authenticate("jwt" , {session: false}),
    isAdmin,
    AlbumController.createNewAlbum
);

router.get("/:id" , AlbumController.getTrackByAlbum);


module.exports = router;