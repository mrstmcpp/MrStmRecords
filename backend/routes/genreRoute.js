const express = require("express");
const router = express.Router();
const genreModel = require("../models/genreModel");
const passport = require("passport");
const SongModel = require("../models/trackModel");

router.post("/createNew", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { genreName, description, artwork } = req.body;
    if (!genreName) {
        return res.status(400).json({ error: "Must enter genre name" }); 
    }
    const payload = {
        genreName,
        description,
        tracksName: [],
        artwork,
    }

    try {
        const genreDetails = await genreModel.create(payload);
        return res.status(201).json(genreDetails);
    } catch (error) {
        return res.status(500).json({ message: "Error creating genre", error });
    }
});

router.get("/genres", async (req, res) => {
    try {
        const genreDetails = await genreModel.find({});
        res.status(200).json(genreDetails);
    } catch (error) {
        res.status(500).json({ message: "Error fetching genre details", error });
    }
});


router.get("/genres/:genreId" , async(req , res) => {
    const {genreId} = req.params;
    const genre = await genreModel.find({_id : genreId});
    return res.status(200).json({data : genre});
})


router.put("/updateGenre/:genreId" , passport.authenticate("jwt" , {session: false}) , async(req , res) => {
    const {genreId} = req.params;
    const {artwork , description , genreName} = req.body;

    try {
        const updatedGenre = await genreModel.findByIdAndUpdate(genreId , {artwork , description ,  genreName} , {new : true});
        if (!updatedGenre) {
            return res.status(404).json({ message: "Genre not found" });
        }

        return res.status(200).json(updatedGenre);
    } catch (error) {
        return res.status(500).json({ message: "Error updating genre", error });
    }
})


router.get("/id/:genreId", async (req, res) => {
    const genreId = req.params.genreId;
    const playlistToShow = await genreModel.findOne({ _id: genreId }).populate("tracksName");
    if (!playlistToShow) {
        return res.status(301).json({ error: "Doesn't exist." })
    }
    return res.status(200).json(playlistToShow.tracksName);
})


router.post("/add/song" , passport.authenticate("jwt" , {session: false}) , async(req,res) =>{
    const {genreId , trackId} = req.body;
    const verifyGenreId = await genreModel.findOne({_id: genreId});
    if(!verifyGenreId){
        return res.status(301).json({error: "Invalid Genre Name"});
    }
    const verifyTrackId = await SongModel.findOne({_id : trackId});
    if(!verifyTrackId){
        return res.status(301).json({error: "Invalid track."});
    }

    if(verifyGenreId.tracksName.includes(trackId)){
        return res.status(301).json({error: "Already Exist."});
    }

    verifyGenreId.tracksName.push(trackId);
    await verifyGenreId.save();
    return res.status(200).json(verifyGenreId);
})

module.exports = router;
