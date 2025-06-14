const express = require("express");
const UserModel = require("../models/artistModel");
const SongModel = require("../models/trackModel");
const router = express.Router();


//getting artist page
router.get("/id/:artistId" , async(req, res) => {
    const {artistId} = req.params;
    const artistData = await UserModel.findOne({_id : artistId} , 'stageName , artistImage , username , lastName , email , bio , socialLinks');
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

        const tracksData = await SongModel.find({artist : artistId}).populate("artist");
        if(!tracksData || tracksData.length === 0){
            return res.status(404).json({error: "No Data available to show"});
        }
        return res.status(200).json(tracksData);
    } catch (error) {
        return res.status(500).json({ error: "Server error occurred." });
    }
});

router.get("/similar/:artistId", async (req, res) => {
    const { artistId } = req.params;

    try {
        const artist = await UserModel.findOne({ _id: artistId });
        
        if (!artist) {
            return res.status(404).json({ error: "Artist not found" });
        }

        const similarArtists = await UserModel.find({
            _id: { $ne: artistId },
            genre: artist.genre
        }).limit(5);

        return res.status(200).json(similarArtists);
    } catch (error) {
        return res.status(500).json({ error: "Server error occurred." });
    }
});

module.exports = router;