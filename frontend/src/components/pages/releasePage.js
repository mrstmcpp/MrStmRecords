import React, { useEffect, useState } from "react";
import Layout from "../../layouts/Layout";
import { Helmet } from "react-helmet";
import {authenticatedGETRequest} from "../../utils/ServerHelpers";
import TrackView from "../shared/trackView";

const ReleasesPage = () => {

    const [songData , setsongData] = useState([]);

    
    useEffect( () => {
        const TrackGetFunction = async() =>{
            try {
                const tracksfromApi = await authenticatedGETRequest("/song/getallsongs");
                setsongData(tracksfromApi);
                
            } catch (error) {
                console.log(error);
            }
        }

        TrackGetFunction();
    }, [])


    return (

        <Layout>
            <Helmet>
                <title>Releases</title>
            </Helmet>
            <h1 className="text-3xl font-bold text-center mb-8 text-white pt-24">Top 20 Tracks</h1>

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
    )
}

export default ReleasesPage;