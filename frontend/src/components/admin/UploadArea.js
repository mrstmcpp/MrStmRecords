import React, { useState } from "react";
import Layout from "../../layouts/Layout";
import UploadTrack from "./UploadSong";
import UploadThumbnail from "./UploadThumbnail";
import TextInput from "../shared/TextInput";
import { authenticatedPostRequest } from "../../utils/ServerHelpers";

const UploadArea = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString();
    const [title, setTitle] = useState("");
    const [albumArt, setAlbumArt] = useState("");
    const [trackUrl, settrackUrl] = useState("");
    const [releaseDate, setreleaseDate] = useState(formattedDate);

    const [error, setError] = useState("");

    const validateInputs = () => {
        if (!title || !albumArt || !trackUrl || !releaseDate) {
            setError("All fields are required.");
            return false;
        }
        return true;
    };

    const submitTrack = async () => {
        if (!validateInputs()) {
            return;
        }

        const data = {
            title,
            albumArt,
            trackUrl,
            releaseDate
        };

        try {
            const response = await authenticatedPostRequest("/song/create", data);
            if (response && !response.err) {
                alert("Successfully uploaded.");
                
            } else {
                alert("Upload failed. Please check your data and try again.");
                
            }
        } catch (error) {
            alert("An error occurred while uploading. Please try again.");
            
        }
    };

    return (
        <Layout>
            <div className='bg-app-color flex flex-col items-center justify-center py-40'>
                <div className='w-full max-w-screen-md px-6 py-10 bg-gray-800 shadow-md rounded-lg'>
                    <div className='text-center font-bold text-white mb-6 text-2xl'>Upload Your Songs Here</div>
                    {error && <div className="text-white mb-4 bg-red-600 rounded-full px-4 py-2">{error}</div>}
                    <TextInput placeholder={"Title"} label={"Title of the track"} value={title} setValue={setTitle} />
                    <div className="flex items-center justify-between py-8 font-semibold">
                        <div className="place-content-center place-items-center text-center"><UploadThumbnail value={albumArt} setValue={setAlbumArt} /></div>
                    </div>
                    <div className="flex items-center justify-between py-8 font-semibold">
                        <div className=""><UploadTrack value={trackUrl} setValue={settrackUrl} /></div>
                    </div>
                    <TextInput placeholder={"YYYY-MM-DD"} label={"Release Date"} className="py-8" value={releaseDate} setValue={setreleaseDate} />
                    <div className="py-4"></div>
                    <div className="bg-orange-400 rounded-full px-3 py-2 font-semibold text-center items-center w-20 hover:bg-orange-300 cursor-pointer" onClick={submitTrack}>
                        Submit
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default UploadArea;
