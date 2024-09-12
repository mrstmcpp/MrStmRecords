import React, { useEffect, useState } from "react";
import Layout from "../../layouts/Layout";
import { topArtistsData } from "../cards/artistsData";
import { ArtistCard } from "../shared/ArtistCards";
import { TailSpin } from 'react-loader-spinner'; 

const AllArtistPage = () => {
    const [allArtists, setAllArtists] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const functiontoget = async () => {
            try {
                const data = await topArtistsData();
                setAllArtists(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false); 
            }
        };

        functiontoget();
    }, []);

    return (
        <Layout>
            <h1 className="text-3xl font-bold text-center mb-8 text-white pt-24">Our Artists</h1>
            {loading ? (
                <div className="flex justify-center items-center h-64"> {/* Center the spinner */}
                    <TailSpin visible={true} height="80" width="80" color="#F97316" />
                </div>
            ) : (
                <div className="flex flex-wrap justify-center">
                    {allArtists.map((card, index) => (
                        <ArtistCard
                            key={index}
                            artistName={card.stageName}
                            imageUrl={card.artistImage}
                            profileUrl={`/artist/id/${card._id}`}
                        />
                    ))}
                </div>
            )}
        </Layout>
    );
};

export default AllArtistPage;
