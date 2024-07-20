const express = require("express");
const router = express.Router();
const genreModel = require("../models/genreModel");
const passport = require("passport");

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


module.exports = router;
