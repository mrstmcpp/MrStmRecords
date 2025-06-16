const ArtistModel = require("../models/artistModel");
const bcrypt = require("bcrypt");
const getToken = require("../utils/helpers");

exports.createNewArtist = async (req, res) => {
  const {stageName, artistImage } =
    req.body;
  const user = req.user._id;

  if (!stageName || !artistImage) {
    return res.status(400).json({ error: "Insufficient details." });
  }

  try {
    const artistByStageName = await ArtistModel.findOne({ stageName });
    if (artistByStageName) {
      return res
        .status(409)
        .json({ error: "Artist with this stage name already exists." });
    }

    const existingArtist = await ArtistModel.findOne({ user });
    if (existingArtist) {
      return res
        .status(409)
        .json({ error: "Artist already linked to this user." });
    }


    const newArtist = new ArtistModel({
      user,
      stageName,
      artistImage,
    });

    await newArtist.save();

    return res.status(201).json({
      message: "Successfully registered for artist account.",
    });
  } catch (error) {
    console.error("Error creating artist:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};



exports.getArtistDetailsPublic = async (req, res) => {
  const { id } = req.params;
  try {
    const artistDetails = await ArtistModel.findById(
      id,
      "stageName artistImage bio socialLinks"
    );
    if (!artistDetails) {
      return res
        .status(400)
        .json({ error: "Please provide a valid artist id." });
    }
    return res.status(200).json(artistDetails);
  } catch (e) {
    return res.status(500).json({ error: "Internal Server Error." , e });
  }
};
