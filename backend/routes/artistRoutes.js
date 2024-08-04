const express = require("express");
const UserModel = require("../models/userModel");
const router = express.Router();


//getting artist page
router.get("/id/:getArtistId" , async(req, res) => {
    const {getArtistId} = req.params;
    const artistData = await UserModel.findById(getArtistId);
    return res.status(200).json({artistData});

})

router.get("/topArtists" , async(req, res) =>{
    const artistData = await UserModel.find({} , 'stageName , artistImage');
    return res.status(200).json(artistData);
})


module.exports = router;