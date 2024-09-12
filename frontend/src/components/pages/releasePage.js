import React, { useEffect, useState } from "react";
import Layout from "../../layouts/Layout";
import { Helmet } from "react-helmet";
import { authenticatedGETRequest } from "../../utils/ServerHelpers";
import TrackView from "../shared/trackView";
import { TailSpin } from "react-loader-spinner";

const ReleasesPage = () => {
    const [songData, setsongData] = useState([]);
    const [loading, setLoading] = useState(true); // New loading state

    useEffect(() => {
        const TrackGetFunction = async () => {
            try {
                const tracksfromApi = await authenticatedGETRequest("/song/getallsongs");
                setsongData(tracksfromApi);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false); // Set loading to false after the data is fetched
            }
        };

        TrackGetFunction();
    }, []);

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
    
    const top3shorted = songData.toSorted((a , b) => b.plays - a.plays);

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
                        text={card.title}
                        urlImage={card.albumArt}
                        artist={card.artist}
                        genre={card.genre}
                        id={card._id}
                        all={card}
                    />
                ))}
            </div>


            <h1 className="text-3xl font-bold text-center mb-8 text-white pt-24">All Time Releases</h1>
            <div className="flex flex-wrap justify-center mb-8">
                {songData.map((card, index) => (
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
        </Layout>
    );
};

export default ReleasesPage;
