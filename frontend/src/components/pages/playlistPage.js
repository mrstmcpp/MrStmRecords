import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../layouts/Layout";
import { unauthenticatedGETRequest } from "../../utils/ServerHelpers";
import TrackView from "../shared/trackView";
import { toast } from "react-toastify";



const PlaylistPage = () => {
    const { playlistId } = useParams();
    const [playlistData, setplaylistData] = useState([]);
    const [playlistName, setplaylistName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlaylistData = async () => {
            try {
                const playlistWiseSongs = await unauthenticatedGETRequest(`/playlist/id/${playlistId}`);
                setplaylistData(playlistWiseSongs || []);


            } catch (error) {
                console.error("Error fetching playlist data:", error);
            }
        };

        if (playlistId) {
            fetchPlaylistData();
        }

        const fetchPlaylistName = async () => {
            try {
                const playlistName = await unauthenticatedGETRequest(`/playlist/name/${playlistId}`);
                setplaylistName(playlistName.name);
            } catch (error) {
                console.error("Error occured during fetching playlist details.")
            }
        };

        fetchPlaylistName();

        toast.error("This page is under construction...");
        setTimeout(() => {
            navigate("/");
        }, 3000);

    }, [playlistId, navigate]);

    return (
        <Layout>
            <h1 className="text-3xl font-bold text-center mb-8 text-white pt-24">{playlistName}</h1>
            <div className="flex flex-wrap justify-center">
                {/* {playlistData.map((card, index) => (
                    <TrackView
                        key={index}
                        text={card.title}
                        urlImage={card.albumArt}
                        artist={card.artist}
                        genre={card.genre}
                        id={card._id}
                        all={card}
                    />
                ))} */}
            </div>
        </Layout>
    );
}

export default PlaylistPage;
