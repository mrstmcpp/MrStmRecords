const ArtistModel = require("../models/artistModel");
const UserModel = require("../models/userModel");

exports.createNewArtist = async (req, res) => {
  const { stageName, artistImage } =
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

    if (user && newArtist) {
      await UserModel.findByIdAndUpdate(user, { artist: newArtist._id }, { new: true });
    }

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
      "stageName artistImage bio socialLinks user"
    );
    if (!artistDetails) {
      return res
        .status(400)
        .json({ error: "Please provide a valid artist id." });
    }
    return res.status(200).json(artistDetails);
  } catch (e) {
    return res.status(500).json({ error: "Internal Server Error.", e });
  }
};

exports.getAllArtists = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const total = await ArtistModel.countDocuments();
    const artists = await ArtistModel.find({})
      .select('stageName artistImage')
      .skip(skip)
      .limit(limit);

    if (!artists || artists.length === 0) {
      return res.status(404).json({ error: "No artists found." });
    }

    return res.status(200).json({
      totalArtists: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      artists,
    });
  } catch (error) {
    console.error("Error fetching artists:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};
