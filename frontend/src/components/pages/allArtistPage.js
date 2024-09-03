import React, { useEffect, useState } from "react"
import Layout from "../../layouts/Layout"
import { topArtistsData } from "../cards/artistsData"
import { ArtistCard } from "../shared/ArtistCards"
const AllArtistPage = () => {
    const [allArtists, setAllArtists] = useState([]);
    
    useEffect(() => {
        const functiontoget = async () => {
            try {
                const data = await topArtistsData();
                setAllArtists(data);
            } catch (error) {
                console.log(error);
            }
        }

        functiontoget();
    }, [])
    return (
        <Layout>
            <h1 className="text-3xl font-bold text-center mb-8 text-white pt-24">Our Artists</h1>
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
        </Layout>
    )
}

export default AllArtistPage;