const AlbumModel = require("../models/albumModel");
const TrackModel = require("../models/trackModel");

exports.createNewAlbum = async (req, res) => {
  const { trackIds, name, albumArt, description, artists } = req.body;
  if (!!Array.isArray(trackIds) && trackIds.length < 3) {
    return res.status(400).json({
      Error: "Please provide atleast 3 tracks to make an album.",
    });
  }
  try {
    const tracks = await TrackModel.find({ _id: { $in: trackIds } });

    if (tracks.length !== trackIds.length) {
      return res.status(400).json({
        error: "One or more track IDs are invalid.",
      });
    }
    const newAlbum = new AlbumModel({
      name,
      albumArt,
      description,
      tracks: trackIds,
      artists,
    });

    await newAlbum.save();

    return res.status(201).json({
      message: "Album created successfully.",
      album: newAlbum,
    });
  } catch (error) {
    console.error("Error creating album:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

exports.getTrackByAlbum = async (req, res) => {
  const { id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  try {
    const albumTracks = await AlbumModel.findById(id).populate("tracks").populate("artists");
    if (!albumTracks) {
      return res.status(400).json({
        error: "Invalid Album ID",
      });
    }

    const totalTracks = albumTracks.tracks.length;
    const paginatedTracks = albumTracks.tracks.slice(startIndex, startIndex + limit);
    
    

    return res.status(200).json({
      albumId: albumTracks._id,
      albumName: albumTracks.name,
      totalTracks,
      currentPage: page,
      totalPages: Math.ceil(totalTracks / limit),
      tracks: paginatedTracks,
      artists: albumTracks.artists.map(artist => artist.stageName)
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error." });
  }
};
