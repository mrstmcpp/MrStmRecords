import React, { useEffect, useState } from "react";
import Layout from "../../layouts/Layout";
import { topArtistsData } from "../cards/artistsData";
import { ArtistCard } from "../shared/ArtistCards";
import { TailSpin } from 'react-loader-spinner';

const AllArtistPage = () => {
    const [allArtists, setAllArtists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const data = await topArtistsData();
                setAllArtists(Array.isArray(data?.artists) ? data.artists : []);
            } catch (error) {
                console.error("Error fetching artists:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchArtists();
    }, []);

    return (
        <Layout>
            <h1 className="text-3xl font-bold text-center mb-8 text-white pt-24">
                Our Artists
            </h1>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <TailSpin visible={true} height="80" width="80" color="#F97316" />
                </div>
            ) : allArtists.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-6 px-4">
                    {allArtists.map((card) => (
                        <ArtistCard
                            key={card._id}
                            artistName={card.stageName}
                            imageUrl={card.artistImage}
                            profileUrl={`/artist/${card._id}`}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center text-white">No artists found.</p>
            )}
        </Layout>
    );
};

export default AllArtistPage;
