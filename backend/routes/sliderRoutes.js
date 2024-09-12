const express = require("express");
const sliderModel = require("../models/sliderModel");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

router.post("/create-new", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { title, linkUrl, imageUrl, description } = req.body;
    if (!title || !linkUrl || !imageUrl) {
        return res.status(300).json("Insuffiecient details provided");
    }

    const dataPayload = {
        title: title,
        linkUrl: linkUrl,
        imageUrl: imageUrl,
        description: description,
    }

    try {
        const dbcall = await sliderModel.create(dataPayload);
        if (dbcall) {
            return res.status(200).json("Successfully entered");
        }
    } catch (error) {
        return res.status(500).json("Internval server error.");
    }

})

router.get("/sliders", async (req, res) => {
    

    try {
        const sliderData = await sliderModel.find();
        if (!sliderData || sliderData.length === 0) {
            return res.status(404).json({ message: "No sliders found." });
        }
        return res.status(200).json(sliderData);
    } catch (error) {
        return res.status(500).json("Internal server error.");
    }
})