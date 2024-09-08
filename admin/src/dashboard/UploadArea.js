import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UploadTrack from "./UploadSong";
import UploadThumbnail from "./UploadThumbnail";
import { authenticatedPostRequest, unauthenticatedGETRequest } from "../utils/ServerHelpers";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

const UploadArea = () => {
    const today = new Date();
    const [title, setTitle] = useState("");
    const [albumArt, setAlbumArt] = useState("");
    const [trackUrl, setTrackUrl] = useState("");
    const [genre, setGenre] = useState("");
    const [releaseDate, setReleaseDate] = useState(today);
    const [error, setError] = useState("");
    const [genres, setGenres] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await unauthenticatedGETRequest("/genre/genres");
                if (response) {
                    setGenres(response);
                    
                } else {
                    setError("Failed to load genres.");
                    toast.error("Failed to load genres.")
                }
            } catch (error) {
                console.error("Error fetching genres:", error);
                toast.error("Error fetching genres.")
                setError("An error occurred while fetching genres.");
            }
        };

        fetchGenres();
    }, []);

    const validateInputs = () => {
        if (!title || !albumArt || !trackUrl || !releaseDate) {
            toast.error("All fields are required.");
            setError("All fields are required.");
            return false;
        }
        return true;
    };

    const submitTrack = async () => {
        if (!validateInputs()) {
            return;
        }

        // Format releaseDate to YYYY-MM-DD string
        const formattedReleaseDate = releaseDate.toISOString().slice(0, 10);

        const data = {
            title,
            albumArt,
            trackUrl,
            releaseDate: formattedReleaseDate,
            genre : "Psytrance",
        };

        try {
            const response = await authenticatedPostRequest("/song/create", data);
            if (response && !response.err) {
                toast.success("Successfully uploaded.");
                navigate("/admin");
            } else {
                toast.error("Upload failed. Please check your data and try again.");
            }
        } catch (error) {
            toast.error("An error occurred while uploading. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="bg-gray-800 p-8 rounded-lg shadow-2xl">
                
                
                <label className="block text-white font-semibold mb-2">Title of the track:</label>
                <input
                    type="text"
                    placeholder="Enter title here"
                    className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <div className="mt-6 flex flex-col space-y-6">
                    <UploadThumbnail value={albumArt} setValue={setAlbumArt} />
                    <UploadTrack value={trackUrl} setValue={setTrackUrl} />
                </div>

                <div className="flex mt-6 space-x-4">
                    <div className="w-1/2">
                        <label className="block text-white font-semibold mb-2">Release Date:</label>
                        <DatePicker
                            selected={releaseDate}
                            onChange={date => setReleaseDate(date)}
                            dateFormat="yyyy-MM-dd"
                            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white"
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-white font-semibold mb-2">Genre:</label>
                        <select
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white"
                        >
                            <option value="">Select Genre</option>
                            {genres.map((genre, index) => (
                                <option key={index} value={genre.genreName}>
                                    {genre.genreName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                
                <div className="mt-8 flex justify-center">
                    <button onClick={submitTrack} className="bg-orange-500 rounded-full px-8 py-3 font-semibold text-white hover:bg-orange-400 transition duration-300">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UploadArea;
