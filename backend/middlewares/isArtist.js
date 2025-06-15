const ArtistModel = require("../models/artistModel")

module.exports = function isArtist(req , res , next) {
    if(ArtistModel.findOne(req.user._id)){
        return next();
    }else{
        return res.status(403).json({
            error : "You are not authorized for this action."
        })
    }
}