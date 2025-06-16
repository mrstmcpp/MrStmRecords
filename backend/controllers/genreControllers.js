const GenreModel = require("../models/genreModel");
const TrackModel = require("../models/trackModel");


//creation of genre
exports.createNewGenre = async (req, res) => {
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
  };

  try {
    const genreDetails = await GenreModel.create(payload);
    return res.status(201).json(genreDetails);
  } catch (error) {
    return res.status(500).json({ message: "Error creating genre", error });
  }
};

//add new track to genre
exports.addTrackToGenre = async (req, res) => {
  const { trackId, genreId } = req.body;
  try {
    const track = await TrackModel.findById(trackId);
    if (!track) {
      return res.status(404).json({
        error: "Invalid track id provided.",
      });
    }

    const genre = await GenreModel.findById(genreId);
    if (!genre) {
      return res.status(404).json({
        error: "Invalid genre id provided.",
      });
    }

    if (!genre.tracks.includes(track._id)) {
      genre.tracks.push(track._id); 
      await genre.save(); 
    }
    
    return res.status(200).json({
      Success: "Added successfully.",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

//get all track from a genre
exports.getTracksByGenre = async (req, res) => {
  const { genreId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;

  try {
    const genre = await GenreModel.findById(genreId);
    if (!genre) {
      return res.status(404).json({ error: "Invalid genre Id." });
    }

    const total = await TrackModel.countDocuments({ genre: genreId });

    const tracks = await TrackModel.find({ genre: genreId })
      .populate("artists", "stageName") 
      .populate("genre", "name")  
      .skip(startIndex)
      .limit(limit);

    return res.status(200).json({
      total,
      page,
      limit,
      results: tracks,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


//to get all genres name at homepage
exports.getAllGenres = async(req , res) => {
  try{
    const genres = await GenreModel.find({}, '_id name description');
    if(genres){
      return res.status(200).json(genres);
    }
  }catch(e){
      return res.status(500).json({error : "Internal Server Error."});
  }
}

//update genre details
exports.updateGenreDetails = async(req , res) => {
  const {genreId} = req.params;
  const {name , artwork , description} = req.body;

  try{
    const genre = await GenreModel.findByIdAndUpdate(
      genreId,
      {name, artwork, description},
      {new : true , runValidators: true, fields: '_id name artwork description',}
    );
    if(!genre){
      return res.status(400).json({
        error: "Please provide a valid genre id."
      })
    }
    return res.status(200).json({Success : "Updated successfully."});

  }catch(e){
    if (e.name === "CastError" && e.kind === "ObjectId") {
      return res.status(400).json({ error: "Invalid Genre ID format." });
    }
    return res.status(500).json({error : "Internal Server Error." , 
      e
    });
  }
}
