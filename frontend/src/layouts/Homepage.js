import React from "react";
import Layout from "./Layout";
import { useState, useEffect } from "react";
import { HomeCards } from "../components/shared/HomeCards";
import { topArtistsData } from "../components/cards/artistsData";
import { topTracksData } from "../components/cards/topTracks";
import { GenreCards } from "../components/shared/GenreCards"
import {fetchGenre} from "../components/cards/genreData";
import { LazySlider } from "../components/shared/NewReleasesCard";
import { slides } from "../components/cards/NewReleaseData";
import { ArtistCard } from "../components/shared/ArtistCards";

const Homepage = () => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const getGenres = async () => {
            try {
                const genreData = await fetchGenre();
                setGenres(genreData);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };

        getGenres();
    }, []);

    return (
        <Layout>
            <div className='bg-app-color pb-16'>
                <div className="">
                    <LazySlider className="" slides={slides} />
                </div>



                {/* Top Tracks cards */}
                <h1 className="text-3xl font-bold text-center mb-8 text-white pt-24">Top Tracks</h1>
                <div className="flex flex-wrap justify-center">
                    {topTracksData.map((card, index) => (
                        <HomeCards
                            key={index}
                            text={card.text}
                            urlImage={card.imageUrl}
                            artist={card.artist}
                            genre={card.genre}
                        />
                    ))}
                </div>

                {/* Top Artists cards */}
                <h1 className="text-3xl font-bold text-center mb-8 text-white pt-24">Our Artists</h1>
                <div className="flex flex-wrap justify-center">
                    {topArtistsData.map((card, index) => (
                        <ArtistCard
                            key={index}
                            artistName={card.artist}
                            imageUrl={card.urlImage}
                            profileUrl={card.url}
                            
                        />
                    ))}
                </div>

                {/* Music Genres Section */}
                <h1 className="text-3xl font-bold text-center text-white mb-8 pt-24">Music Genres</h1>
                <div className="flex flex-wrap justify-center">
                    {genres.map((genre, index) => (
                        <GenreCards
                            key={index}
                            genreName={genre.genreName}
                            description={genre.description}
                            imageUrl={genre.artwork}
                            
                        />
                    ))}
                </div>
                
            </div>
        </Layout>
    );
}

export default Homepage;
