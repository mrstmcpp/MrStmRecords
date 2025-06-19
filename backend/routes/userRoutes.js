const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');

router.post('/register' , userController.register);

router.post("/login", userController.login);

router.get("/logout" , passport.authenticate("jwt" , {session : false}), userController.logout);

router.get("/:userId" , userController.getUserAccountPublic);

router.put("/like/playlist/:playlistId" , passport.authenticate("jwt" , {session: false}) , userController.likePlaylist);

router.put("/like/track/:trackId" , passport.authenticate("jwt" , {session: false}) , userController.likeTrack);

module.exports = router;
