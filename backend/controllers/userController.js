const UserModel = require('../models/userModel');
const getToken = require('../utils/helpers');
const bcrypt = require('bcrypt');
const TrackModel = require("../models/trackModel");
const playlistModel = require('../models/playlistModel');

exports.register = async (req, res) => {
    try {
        const { email, firstName, lastName, password } = req.body;

        if (!email || !firstName || !password) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            email,
            password: hashedPassword,
            firstName,
            lastName,
        });

        await newUser.save();

        const token = await getToken(email, newUser);

        const userToReturn = {
            ...newUser.toObject(),
            token,
        };
        delete userToReturn.password;

        return res.status(201).json(userToReturn);
    } catch (error) {
        console.error('Error during user registration:', error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: 'Validation error.' });
        }

        if (error.name === 'MongoError' && error.code === 11000) {
            return res.status(409).json({ error: 'Duplicate key error.' });
        }

        return res.status(500).json({ error: 'Internal server error.' });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const loginUser = await UserModel.findOne({ email });
        if (!loginUser) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        const isPasswordRight = await bcrypt.compare(password, loginUser.password);
        if (!isPasswordRight) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        const token = await getToken(loginUser.email, loginUser);
        const userToReturn = { ...loginUser.toObject(), token };
        delete userToReturn.password;

        return res.status(200).json(userToReturn);
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}

exports.logout = async (req, res) => {
    try {
        req.logout();
        return res.status(200).json({ Success: "Successfully logged out." })
    } catch {
        return res.status(500).json({ error: "Internal server error" });
    }
}


exports.getUserAccountPublic = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await UserModel.findById(userId)
            .select("firstName lastName followedArtists")
            .populate("followedArtists", "stageName _id")
        if (!user) {
            return res.status(404).json({
                error: "User not found."
            })
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }
}

exports.likeTrack = async (req, res) => {
    const { trackId } = req.params;
    const user = req.user;
    try {
        const track = await TrackModel.findById(trackId).select("_id");
        if (!track) {
            return res.status(404).json({
                error: "Track not found."
            })
        }

        const alreadyLiked = user.liked.some(
            (like) =>
                like.itemId.toString() === trackId && like.itemType === "Track"
        );

        if (alreadyLiked) {
            return res.status(400).json({ message: "Track already liked." });
        }

        user.liked.push({
            itemId: track._id,
            itemType: "Track",
        });

        await user.save();

        return res.status(200).json({ message: "Track liked successfully." });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }
}


exports.likePlaylist = async (req, res) => {
    const { playlistId } = req.params;
    const user = req.user;
    try {
        const playlist = await playlistModel.findById(playlistId).select("_id");
        if (!playlist) {
            return res.status(404).json({
                error: "Playlist not found."
            })
        }

        const alreadyLiked = user.liked.some(
            (like) =>
                like.itemId.toString() === playlistId && like.itemType === "Playlist"
        );

        if (alreadyLiked) {
            return res.status(400).json({ message: "Playlist already liked." });
        }

        user.liked.push({
            itemId: playlist._id,
            itemType: "Playlist",
        });

        await user.save();

        return res.status(200).json({ message: "Playlist liked successfully." });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }
}