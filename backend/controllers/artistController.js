const ArtistModel = require("../models/artistModel");
const bcrypt = require("bcrypt");
const getToken = require("../utils/helpers");

exports.createNewArtist = async (req, res) => {
  const { firstName, lastName, stageName, artistImage, email, password } =
    req.body;
  const user = req.user._id;

  if (!firstName || !stageName || !email || !password) {
    return res.status(400).json({ error: "Insufficient details." });
  }

  try {
    const artistByStageName = await ArtistModel.findOne({ stageName });
    if (artistByStageName) {
      return res
        .status(409)
        .json({ error: "Artist with this stage name already exists." });
    }

    const artistByEmail = await ArtistModel.findOne({ email });
    if (artistByEmail) {
      return res
        .status(409)
        .json({ error: "Artist with this email already exists." });
    }

    const existingArtist = await ArtistModel.findOne({ user });
    if (existingArtist) {
      return res
        .status(409)
        .json({ error: "Artist already linked to this user." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newArtist = new ArtistModel({
      user,
      firstName,
      lastName,
      stageName,
      artistImage,
      email,
      password: hashedPassword,
    });

    await newArtist.save();

    const token = await getToken(email, newArtist);

    return res.status(201).json({
      message: "Successfully registered for artist account.",
      token,
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
