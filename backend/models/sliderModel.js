const mongo = require("mongoose");

const sliderSchema = new mongo.Schema({
    title:{
        type: String,
        required: true,
    },
    linkUrl:{
        type: String,
    },
    imageUrl:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    }
})

const sliderModel = mongo.Model("Slider" , sliderSchema);

module.exports = sliderModel;