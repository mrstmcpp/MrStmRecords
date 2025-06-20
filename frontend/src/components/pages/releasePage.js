import React, { useEffect, useState, lazy, Suspense } from "react";
import Layout from "../../layouts/Layout";
import { Helmet } from "react-helmet";
import { authenticatedGETRequest } from "../../utils/ServerHelpers";
import { TailSpin } from "react-loader-spinner";
import { Pagination } from "../shared/Pagination";

const TrackView = lazy(() => import("../shared/trackView"));

const ReleasesPage = () => {
    const [trackData, setTrackData] = useState([]);
    const [loading, setLoading] = useState(true); // New loading state
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
        const TrackGetFunction = async () => {
            try {
                const tracksfromApi = await authenticatedGETRequest(`/track?page=${page}`);
                setTrackData(tracksfromApi);
                setTotalPages(tracksfromApi.totalPages)
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false); // Set loading to false after the data is fetched
            }
        };

        TrackGetFunction();
    }, [page]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <TailSpin
                    visible={true}
                    height="80"
                    width="80"
                    color="#F97316"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                />
            </div>
        );
    }

    const top3shorted = trackData.tracks.toSorted((a, b) => b.plays - a.plays);

    return (
        <Layout>
            <Helmet>
                <title>Releases</title>
            </Helmet>
            <h1 className="text-3xl font-bold text-center mb-8 text-white pt-24">Top 20 Tracks</h1>
            <div className="flex flex-wrap justify-center mb-8">
                {top3shorted.slice(0, 3).map((card, index) => (
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
            </div>


            <h1 className="text-3xl font-bold text-center mb-8 text-white pt-24">All Time Releases</h1>
            <div className="flex flex-wrap justify-center mb-8">
                <Suspense fallback={<TailSpin height={40} width={40} color="#F97316" />}>
                    {trackData.tracks.map((card, index) => (
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

            <h1 className="flex flex-wrap justify-center mb-8">
                <Pagination totalPages={totalPages} page={page} setPage={setPage} />
            </h1>

        </Layout>
    );
};

export default ReleasesPage;
