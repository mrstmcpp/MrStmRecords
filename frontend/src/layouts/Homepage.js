import React from "react";
import Layout from "./Layout";
import { HomeCards } from "../components/shared/HomeCards";

import { topArtistsData } from "../components/cards/artistsData";
import { topTracksData } from "../components/cards/topTracks";
import { GenreCards } from "../components/shared/GenreCards"
import { genreData } from "../components/cards/genreData";
import {LazySlider} from "../components/shared/NewReleasesCard";
import { slides } from "../components/cards/NewReleaseData";

const Homepage = () => {

    return (
        <Layout>
            <div className='bg-app-color pb-16'>
                <div className="">
                    <LazySlider className="" slides={slides} />
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
