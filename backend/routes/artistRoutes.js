const express = require("express");
const UserModel = require("../models/userModel");
const SongModel = require("../models/songModel");
const router = express.Router();


//getting artist page
router.get("/id/:artistId" , async(req, res) => {
    const {artistId} = req.params;
    const artistData = await UserModel.findOne({_id : artistId} , 'stageName , artistImage , username , lastName , email , bio');
    return res.status(200).json(artistData);

})

//fetching artist details

router.get("/topArtists" , async(req, res) =>{
    const artistData = await UserModel.find({} , 'stageName , artistImage');
    return res.status(200).json(artistData);
})


//getting song by artist
router.get("/tracks/:artistId", async (req, res) => {
    const { artistId } = req.params;

    try {
        
        const artistExist = await UserModel.findOne({ _id : artistId });
        
        if (!artistExist || artistExist.length === 0) {
            return res.status(404).json({ error: "No such artist available." });
        }

        const tracksData = await SongModel.find({artist : artistId});
        if(!tracksData || tracksData.length === 0){
            return res.status(404).json({error: "No Data available to show"});
        }
        return res.status(200).json(tracksData);
    } catch (error) {
        return res.status(500).json({ error: "Server error occurred." });
    }
});

module.exports = router;