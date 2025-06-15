exports.createNewTrack = async (req, res) => {
  const { title, releaseDate, plays, albumArt, trackUrl, genre } = req.body;
  if (!title || !releaseDate || !albumArt || !trackUrl || !genre) {
    return res.status(301).json({ error: "Insufficient details." });
  }
  const artist = req.user._id;
  const songDetails = {
    title,
    releaseDate,
    plays,
    albumArt,
    artist,
    trackUrl,
    genre,
  };
  try {
    const createdSong = await SongModel.create(songDetails);
    return res.status(200).json(createdSong);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
