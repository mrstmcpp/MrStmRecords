// Homepage.jsx
import React from "react";
import Layout from "./Layout";
import { HomeCards } from "../components/shared/HomeCards";
import { cardsData } from "../components/cards/cardsData";
import { topArtistsData } from "../components/cards/artistsData";
import { topTracksData } from "../components/cards/topTracks";
import { GenreCards } from "../components/shared/GenreCards"
import { genreData } from "../components/cards/genreData";

const Homepage = () => {
    return (
        <Layout>
            <div className='bg-app-color py-20'>
                <h1 className="text-3xl font-bold text-center mb-8 text-white pt-24">New Releases</h1>
                <div className="flex items-center justify-center space-x-4">
                    {cardsData.map((card, index) => (
                        <HomeCards
                            key={index}
                            text={card.text}
                            urlImage={card.urlImage}
                            artist={card.artist}
                            genre={card.genre}
                        />
                    ))}
                </div>

                {/* Top Tracks cards */}
                <h1 className="text-3xl font-bold text-center mb-8 text-white pt-24">Top Tracks</h1>
                <div className="flex items-center justify-center space-x-4">
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
                <div className="flex items-center justify-center space-x-4">
                    {topArtistsData.map((card, index) => (
                        <HomeCards
                            key={index}
                            text={card.text}
                            urlImage={card.urlImage}
                            artist={card.artist}
                            genre={card.genre}
                        />
                    ))}
                </div>

                {/* Music Genres Section */}
                <h1 className="text-3xl font-bold text-center text-white mb-8 pt-24">Music Genres</h1>
                <div className="flex items-center justify-center space-x-4">
                    {genreData.map((genre, index) => (
                        <GenreCards
                            key={index}
                            genreName={genre.genreName}
                            description={genre.description}
                            imageUrl={genre.imageUrl}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default Homepage;
