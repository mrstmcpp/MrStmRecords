import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UploadTrack from "./UploadSong";
import UploadThumbnail from "./UploadThumbnail";
import { authenticatedPostRequest, unauthenticatedGETRequest } from "../../utils/ServerHelpers";
import { useNavigate } from "react-router-dom";

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
                }
            } catch (error) {
                console.error("Error fetching genres:", error);
                setError("An error occurred while fetching genres.");
            }
        };

        fetchGenres();
    }, []);

    const validateInputs = () => {
        if (!title || !albumArt || !trackUrl || !releaseDate || !genre) {
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
            genre
        };

        try {
            const response = await authenticatedPostRequest("/song/create", data);
            if (response && !response.err) {
                alert("Successfully uploaded.");
                navigate("/admin");
            } else {
                alert("Upload failed. Please check your data and try again.");
            }
        } catch (error) {
            alert("An error occurred while uploading. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center h-full">
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-3xl">
                {error && <div className="text-white mb-4 bg-red-600 rounded-full px-4 py-2 text-center">{error}</div>}
                <label className="block text-white font-semibold mb-2">Title of the track:</label>
                <input
                    type="text"
                    placeholder="Title"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className="mt-4 flex flex-col space-y-4">
                    <UploadThumbnail value={albumArt} setValue={setAlbumArt} />
                    <UploadTrack value={trackUrl} setValue={setTrackUrl} />
                </div>

                <div className="flex mt-4 justify-between">
                    <div className="w-1/2 pr-4">
                        <label className="block text-white font-semibold mb-2">Release Date:</label>
                        <DatePicker
                            selected={releaseDate}
                            onChange={date => setReleaseDate(date)}
                            dateFormat="yyyy-MM-dd"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="w-1/2 pl-4">
                        <label className="block text-white font-semibold mb-2">Genre:</label>
                        <select
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
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
                    <button className="bg-orange-400 rounded-full px-6 py-3 font-semibold text-white hover:bg-orange-300 transition duration-300" onClick={submitTrack}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UploadArea;
