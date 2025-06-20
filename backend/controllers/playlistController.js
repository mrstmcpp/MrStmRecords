const ArtistModel = require("../models/artistModel");
const PlaylistModel = require("../models/playlistModel")
const TrackModel = require("../models/trackModel")


exports.createNewPlaylist = async (req, res) => {
    const { name, artwork, description } = req.body;

    if (!name || !artwork) {
        return res.status(400).json({ error: "Insufficient details provided." });
    }

    try {
        const currentUser = req.user._id;
        const artist = await ArtistModel.findOne({ user: currentUser });

        const playlistPayload = {
            name,
            artwork,
            description,
        };

        if (artist) {
            playlistPayload.artistOwners = [artist._id];
        } else {
            playlistPayload.userOwners = [currentUser];
        }

        const newPlaylist = await PlaylistModel.create(playlistPayload);

        return res.status(201).json({
            message: "Playlist created successfully.",
            playlist: newPlaylist,
        });

    } catch (error) {
        console.error("Error creating playlist:", error);
        return res.status(500).json({ error: "Internal Server Error." });
    }
};



exports.getPlaylistTracks = async (req, res) => {
    const { playlistId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    try {
        const playlist = await PlaylistModel.findById(playlistId)
            .populate({
                path: "tracks",
                populate: {
                    path: "artists",
                    select: "stageName",
                },
            })
            .populate("artistOwners", "stageName")
            .populate("userOwners", "firstName lastName");

        if (!playlist) {
            return res.status(404).json({ error: "Playlist not found." });
        }

        const total = playlist.tracks.length;
        const paginatedTracks = playlist.tracks.slice(startIndex, startIndex + limit);

        return res.status(200).json({
            playlistId: playlist._id,
            playlistName: playlist.name,
            totalTracks: total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            tracks: paginatedTracks,
        });
    } catch (error) {
        console.error("Error fetching playlist tracks:", error);
        return res.status(500).json({ error: "Internal Server Error." });
    }
};


exports.updatePlaylist = async (req, res) => {
    const { playlistId } = req.params;
    const { name, artwork, description } = req.body;
    const providedUser = req.user._id;
    try {
        const playlist = await PlaylistModel.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ error: "Playlist not found." });
        }

        const owners = playlist.userOwners.map((id) => id.toString());
        if (!owners.includes(providedUser.toString())) {
            return res.status(403).json({ error: "You are not authorized to modify this playlist." });
        }
        if (name) playlist.name = name;
        if (artwork) playlist.artwork = artwork;
        if (description) playlist.description = description;

        await playlist.save();

        return res.status(200).json({
            message: "Playlist updated successfully.",
            playlist,
        });
    } catch (error) {
        console.error("Error updating playlist:", error);
        return res.status(500).json({ error: "Internal Server Error." });
    }
};


exports.addTrackToPlaylist = async (req, res) => {
    const { playlistId } = req.params;
    const { trackId } = req.body;
    const currentUserId = req.user._id;

    if (!trackId) {
        return res.status(400).json({ error: "Track ID is required." });
    }

    try {
        const playlist = await PlaylistModel.findById(playlistId);
        if (!playlist) {
            return res.status(404).json({ error: "Playlist not found." });
        }

        const artist = await ArtistModel.findOne({ user: currentUserId });

        const isUserOwner = playlist.userOwners?.some(
            (id) => id.toString() === currentUserId.toString()
        );

        const isArtistOwner = artist && playlist.artistOwners?.some(
            (id) => id.toString() === artist._id.toString()
        );

        if (!isUserOwner && !isArtistOwner) {
            return res.status(403).json({ error: "You are not authorized to modify this playlist." });
        }

        const trackExists = await TrackModel.findById(trackId);
        if (!trackExists) {
            return res.status(400).json({ error: "Invalid track ID." });
        }

        if (playlist.tracks.includes(trackId)) {
            return res.status(409).json({ error: "Track already in playlist." });
        }

        playlist.tracks.push(trackId);
        await playlist.save();

        return res.status(200).json({
            message: "Track added to playlist.",
            playlist,
        });
    } catch (error) {
        console.error("Error adding track to playlist:", error);
        return res.status(500).json({ error: "Internal Server Error." });
    }
};


exports.getAllPlaylists = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const total = await PlaylistModel.countDocuments();
        const playlists = await PlaylistModel.find({})
            .select('_id name artwork description')
            .skip(skip)
            .limit(limit);

        if (!playlists || playlists.length === 0) {
            return res.status(404).json({ error: "No playlists found." });
        }

        return res.status(200).json({
            totalPlaylists: total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            playlists,
        });
    } catch (error) {
        console.error("Error fetching playlists:", error);
        return res.status(500).json({ error: "Internal Server Error." });
    }
};
