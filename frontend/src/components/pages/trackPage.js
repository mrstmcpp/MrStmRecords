import React, { useEffect, useState, useContext } from "react";
import Layout from "../../layouts/Layout";
import Helmet from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { unauthenticatedGETRequest } from "../../utils/ServerHelpers";
import "../shared/NewReleaseCards.css";
import TrackView from "../shared/trackView";
import playerContext from "../../contexts/playerContexts";
import {Icon} from "@iconify/react";


const TrackPage = () => {
    const { currSong, setCurrSong } = useContext(playerContext);
    const { trackID } = useParams();
    const [trackData, setTrackData] = useState({});
    const [relatedTrackData, setRelatedTrackData] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSongDetails = async () => {
            try {
                const trackDetails = await unauthenticatedGETRequest(`/song/id/${trackID}`);
                if (trackDetails) {
                    setTrackData(trackDetails.track);
                    setRelatedTrackData(trackDetails.relatedTracks);
                    console.log(trackDetails.relatedTracks)

                } else {
                    setError("No track details found.");
                }
            } catch (error) {
                console.error("Failed to fetch track details:", error);
                setError("Failed to fetch track details.");
            } finally {
                setIsLoading(false);
            }
        };


        fetchSongDetails();
    }, [trackID]);

    const titleOfTrack = isLoading ? "Loading..." : trackData.title || "Track Not Found";

    const containerStyle = trackData.albumArt
        ? { backgroundImage: `url(${trackData.albumArt})` }
        : {};

    return (
        <Layout>
            <Helmet>
                <title>{titleOfTrack}</title>
            </Helmet>

            {isLoading ? (
                <p className="text-white text-center">Loading track details...</p>
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : (
                <div>
                    <div
                        className="background-release-image"
                        style={{ backgroundImage: `url(${trackData.albumArt})` }}
                    ></div>

                    <div className="content-release-box">




                        <div className="flex flex-wrap justify-center space-x-8">
                            <img
                                src={trackData.albumArt}
                                alt={`${trackData.title} album art`}
                                className="w-80 h-80 object-cover rounded-md shadow-lg"
                            />
                            <div className="w-96 h-80 flex flex-col flex-wrap justify-between">
                                <div className="space-y-1">
                                    <div className="text-sm text-white ">
                                        {trackData.songType}
                                    </div>
                                    <div className="text-4xl text-white font-bold ">
                                        {trackData.title}
                                    </div>

                                    <div className="text-white text-lg">
                                        <Link to={`/artist/id/${trackData.artist._id}`}>
                                            {trackData.artist?.stageName}
                                        </Link>
                                    </div>

                                </div>

                                <div className="text-white text-sm">
                                    {trackData.description}
                                </div>

                                <div className="text-gray-500 pb-2">
                                    <div className="text-gray-300">
                                        <strong>Streams:</strong> {trackData.plays}
                                    </div>
                                    <div className="text-gray-300">

                                        <strong>Released:</strong> {new Date(trackData.releaseDate).toLocaleDateString()}
                                    </div>

                                </div>
                            </div>
                        </div>





                        <div className="flex flex-row justify-center space-x-4 mt-12">
                            <button
                                className="flex items-center bg-orange-600 text-white px-4 py-2 rounded-full text-xs font-medium hover:bg-red-600"
                                onClick={() => setCurrSong(trackData)}
                            >
                                <Icon icon="weui:play-filled" /> 
                                PLAY
                            </button>
                            <button
                                className="flex items-center bg-orange-600 text-white px-4 py-2 rounded-full text-xs font-medium hover:bg-red-600"
                                onClick={() => setCurrSong(trackData)}
                            >
                                <Icon icon="ph:queue-bold" />ADD TO QUEUE
                            </button>
                            <button
                                className="flex items-center bg-orange-600 text-white px-4 py-2 rounded-full text-xs font-medium hover:bg-red-600"
                                onClick={() => setCurrSong(trackData)}
                            >
                                <Icon icon="ph:share-bold" />SHARE
                            </button>
                        </div>

                        <div className="border border-gray-500 mt-32 m-8 sm:ml-80 sm:mr-80"></div>

                        <h1 className="text-3xl font-bold text-center mt-24 text-white">More From Artist</h1>
                        <div className="flex flex-wrap justify-center items-center mt-12">
                            {relatedTrackData.map((card, index) => (
                                <TrackView
                                    key={index}
                                    text={card.title}
                                    urlImage={card.albumArt}
                                    artist={card.artist}
                                    genre={card.genre}
                                    id={card._id}
                                    all={card}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default TrackPage;
