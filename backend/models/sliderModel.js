const mongo = require("mongoose");

const sliderContent = new mongo.Schema({
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

const sliderModel = mongo.Model("sliderData" , sliderContent);

module.exports = sliderModel;