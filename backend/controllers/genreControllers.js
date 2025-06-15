const genreModel = require("../models/genreModel")
exports.createNewGenre = async(req , res) => {
    const { name, description, artwork } = req.body;
    if (!name) {
        return res.status(400).json({ error: "Must enter genre name" }); 
    }
    const owner = req.user._id;
    const payload = {
        owner,
        name,
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
}