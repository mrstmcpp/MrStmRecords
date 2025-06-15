const ArtistModel = require("../models/artistModel");

module.exports = async function isArtist(req, res, next) {
    try {
        const artist = await ArtistModel.findOne({ user: req.user._id });

        if (artist) {
            return next();
        } else {
            return res.status(403).json({
                error: "You are not a valid artist."
            });
        }
    } catch (err) {
        return res.status(500).json({
            error: "Server error while checking artist authorization."
        });
    }
};
