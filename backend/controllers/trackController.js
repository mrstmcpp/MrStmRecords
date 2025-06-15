const ArtistModel = require("../models/artistModel");
const TrackModel = require("../models/trackModel");
const GenreModel = require("../models/genreModel")

exports.createNewTrack = async (req, res) => {
  const { name, releaseDate, plays, albumArt, url, genreId , duration } = req.body;
  try {
    if (!name || !releaseDate || !albumArt || !url || !genreId) {
      return res.status(301).json({ error: "Insufficient details." });
    }
    const artistLinkedToUser = await ArtistModel.findOne({ user: req.user._id });; //verification is done in middleware
    const genre = await GenreModel.findById(genreId);
    const trackPayload = {
      name,
      releaseDate,
      plays,
      albumArt,
      artists: artistLinkedToUser,
      url,
      genre : genre,
      duration,
    };
    const createdSong = (await TrackModel.create(trackPayload));
    return res.status(200).json(createdSong);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
