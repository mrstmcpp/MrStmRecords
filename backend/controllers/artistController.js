const ArtistModel = require("../models/artistModel");
const bcrypt = require("bcrypt");
const getToken = require("../utils/helpers");

exports.createNewArtist = async (req, res) => {
    const { firstName, lastName, stageName, artistImage, email, password } =
        req.body;
    const user = req.user._id;


    if (!firstName || !stageName || !email || !password) {
        return res.status(400).json({
            error: "Insufficient details.",
        });
    }
    const artistByStageName = await ArtistModel.findOne({stageName});
    if(artistByStageName){
        return res
            .status(409)
            .json({ error: "Artist with this Stage Name already exists." });
    }
    const artistByEmail = await ArtistModel.findOne({ email });
    if (artistByEmail) {
        return res
            .status(409)
            .json({ error: "Artist with this email already exists." });
    }

    const existingArtist = await ArtistModel.findOne({ user });
    if (existingArtist) {
        return res.status(409).json({ error: "Artist already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const payload = new ArtistModel({
        user,
        firstName,
        lastName,
        stageName,
        artistImage,
        email,
        password: hashedPassword,
    });

    await payload.save();
    const token = await getToken(email, payload);
    return res
        .status(201)
        .json("Successfully registerd for artist account" + token);
};


