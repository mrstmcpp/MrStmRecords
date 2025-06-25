import React, { useEffect, useState, lazy, Suspense } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "../../layouts/Layout";
import { unauthenticatedGETRequest } from "../../utils/ServerHelpers";
import { toast } from "react-toastify";
import { Pagination } from "../shared/Pagination";
import { TailSpin } from 'react-loader-spinner';

const TrackView = lazy(() => import("../shared/trackView"));

const PlaylistPage = () => {
    const navigate = useNavigate();
    const { playlistId } = useParams();
    const [playlistData, setplaylistData] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlaylistData = async () => {
            setLoading(true);
            try {
                const playlistWiseSongs = await unauthenticatedGETRequest(`/playlist/${playlistId}?page=${page}&limit=${limit}`);

                if (!playlistWiseSongs || playlistWiseSongs.error || playlistWiseSongs.tracks === undefined) {
                    toast.error("Playlist not found.");
                    navigate("/");
                    return;
                }

                setplaylistData(playlistWiseSongs);
            } catch (error) {
                toast.error("Invalid playlist. Redirecting...");
                navigate("/");
            } finally {
                setLoading(false);
            }
        };

        fetchPlaylistData();
    }, [playlistId, page, limit, navigate]);

    return (
        <Layout>
            {loading ? (
                <div className="flex items-center justify-center min-h-screen">
                    <TailSpin height={60} width={60} color="#F97316" />
                </div>
            ) : (
                <div>
                    <div
                        className="background-release-image"
                        style={{ backgroundImage: `url(${playlistData.artwork})` }}
                    ></div>

                    <div className="flex flex-col items-center w-full content-release-box">
                        <div className="relative mt-8 w-5/6">
                            <div className="border-t absolute left-0 right-0 top-1/2 transform -translate-y-1/2 z-0 drop-shadow-lg"></div>

                            <img
                                src={playlistData.artwork}
                                alt={playlistData.playlistName}
                                className="h-60 w-60 object-cover rounded-full border-4 border-orange-400 z-10 mx-auto relative drop-shadow-lg"
                                style={{ opacity: 0, transform: 'scale(0.95)', animation: 'fadeInScale 0.6s ease-out forwards' }}
                            />
                        </div>

                        <div className="text-center">
                            <div className="text-4xl font-bold mt-4">
                                {playlistData.playlistName}
                            </div>
                        </div>

                        <div className="flex flex-row font-semibold text-slate-300 text-center mt-2">
                            <div className="text-sm mr-2">Owner:</div>
                            <div className="text-sm">
                                {playlistData.owner?.map((mp, index) => (
                                    <span key={mp._id}>
                                        <Link to={`/artist/${mp._id}`} className="hover:underline">
                                            {mp.stageName}
                                        </Link>
                                        {index < playlistData.owner.length - 1 && <span>, </span>}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="text-xs flex flex-row text-slate-300 gap-x-2">
                            <span>Followed By:</span>
                            <span>{playlistData.likeCount} people</span>
                        </div>

                        <div className="text-center">
                            <div className="text-slate-200 text-xl mt-4 mb-4">
                                {playlistData.description}
                            </div>
                        </div>

                        <div className="flex flex-col justify-items-center place-items-center">
                            <div className="mt-4">
                                <div className="flex flex-wrap justify-center">
                                    <Suspense fallback={<TailSpin height={40} width={40} color="#F97316" />}>
                                        {playlistData.tracks?.map((card, index) => (
                                            <TrackView
                                                key={index}
                                                text={card.name}
                                                urlImage={card.albumArt}
                                                artist={card.artists}
                                                genre={card.genre}
                                                id={card._id}
                                                all={card}
                                            />
                                        ))}
                                    </Suspense>
                                </div>
                            </div>
                            <Pagination page={page} totalPages={playlistData.totalPages} setPage={setPage} />
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default PlaylistPage;
