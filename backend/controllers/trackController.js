const ArtistModel = require("../models/artistModel");
const TrackModel = require("../models/trackModel");
const GenreModel = require("../models/genreModel")

exports.createNewTrack = async (req, res) => {
  const { name, releaseDate, plays, albumArt, url, genreId, duration } = req.body;
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
      genre: genre,
      duration,
    };
    const createdSong = (await TrackModel.create(trackPayload));
    return res.status(200).json(createdSong);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


//to fetch artist's tracks
exports.getTrackByArtist = async (req, res) => {
  const { id } = req.params;
  try {
    const TrackByArtist = await TrackModel.find({ artists: id });
    if (!TrackByArtist) {
      return res
        .status(400)
        .json({ error: "Please provide a valid artist id." });
    }
    return res.status(200).json(TrackByArtist);
  } catch (e) {
    return res.status(500).json({ error: "Internal Server Error." });
  }
};


exports.getTrackById = async (req, res) => {
  const { trackId } = req.params;
  try {
    const track = await TrackModel.findById(trackId)
        .populate('artists' , 'stageName _id')
        .populate('genre' , 'name _id');
    if (!track) {
      return res.status(404).json({
        Error: "Invalid track id."
      })
    }
    const response = {
      name: track.name,
      url: track.url,
      artists: track.artists,
      releaseDate: track.releaseDate,
      plays: track.plays,
      albumArt: track.albumArt,
      genre: track.genre,
      description: track.description,
      songType : track.songType,
      duration: track.duration
    }

    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    return res.status(500).json({Error: "Internal server error."})
  }
}


