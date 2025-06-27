const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');
const jwt = require("jsonwebtoken");
const { frontEndUrl } = require('../../frontend/src/utils/FrontendUrl');

router.post('/register',  userController.register);

router.post("/login", userController.login);

router.get("/logout", passport.authenticate("jwt", { session: false }), userController.logout);

router.get("/:userId", userController.getUserAccountPublic);

router.put("/like/playlist/:playlistId", passport.authenticate("jwt", { session: false }), userController.likePlaylist);

router.put("/like/track/:trackId", passport.authenticate("jwt", { session: false }), userController.likeTrack);


router.get('/auth/google',
    passport.authenticate('google', {
        session: false,
        scope: ['profile', 'email']
    })
);

// Step 2: Handle Google callback
router.get('/auth/google/callback',
    passport.authenticate('google', {
        session: false,
        failureRedirect: '/login'
    }),
    function (req, res) {
        const token = jwt.sign({ id: req.user._id }, "mysecretkeystring", { expiresIn: '1d' });
        res.redirect(`${frontEndUrl}/google-auth-success?token=${token}`);
    }
);

router.get(
  '/auth/spotify',
  passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private'],
    showDialog: true
  })
);

router.get('/auth/spotify/callback',
    passport.authenticate('spotify', { failureRedirect: '/login' }),
    function (req, res) {

        return {Success : "Success"};
    });


module.exports = router;
