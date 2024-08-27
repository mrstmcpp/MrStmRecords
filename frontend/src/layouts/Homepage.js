import React from "react";
import Layout from "./Layout";
import { useState, useEffect } from "react";
import { topArtistsData } from "../components/cards/artistsData";
import { topTracksData } from "../components/cards/topTracks";
import { GenreCards } from "../components/shared/GenreCards"
import { fetchGenre, fetchPlaylist } from "../components/cards/genreData";


import { LazySlider } from "../components/shared/NewReleasesCard";
import { slides } from "../components/cards/NewReleaseData";
import { ArtistCard } from "../components/shared/ArtistCards";
import { PlaylistCards } from "../components/shared/playlistCard";
import TrackView from "../components/shared/trackView";
import { Link } from "react-router-dom";

const Homepage = () => {
    const [genres, setGenres] = useState([]);
    const [artists, setArtist] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [songData, setsongData] = useState([]);



    useEffect(() => {
        const getGenres = async () => {
            try {
                const genreData = await fetchGenre();
                setGenres(genreData);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };
        const getArtist = async () => {
            try {
                const artistData = await topArtistsData();
                setArtist(artistData);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };
        const getPlaylist = async () => {
            try {
                const playlistData = await fetchPlaylist();
                setPlaylist(playlistData.playlists);
            } catch (error) {
                console.error("Error occured.", error);
            }
        }
        const getAllSongs = async () => {
            try {
                const tracksData = await topTracksData();
                setsongData(tracksData);
                
            } catch (error) {
                console.log("Error occured while fetching top tracks : ", error);
            }
        }
        getArtist();
        getGenres();
        getPlaylist();
        getAllSongs();
    }, []);



    return (
        <Layout>
            <div className='bg-app-color pb-16'>
                <div className="pt-8">
                    <LazySlider className="" slides={slides} />
                </div>




                {/* Top Tracks cards */}
                <div className="flex flex-col flex-wrap justify-center items-center pt-24 mb-4">
                    <div className="text-3xl font-bold text-white z-10">
                        Latest Releases
                    </div>

                    <div className="pt-2 text-xs font-semibold text-gray-400 z-10 hover:text-gray-200">
                        <Link to={"/releases"}>
                            VIEW ALL
                        </Link>
                    </div>

                </div>

                <div className="flex flex-wrap justify-center">
                    {songData.slice(0, 5).map((card, index) => (
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


                {/* Top Artists cards */}
                <h1 className="text-3xl font-bold text-center mb-8 text-white pt-24">Our Artists</h1>
                <div className="flex flex-wrap justify-center">

                    {artists.slice(0, 5).map((card, index) => (
                        <ArtistCard
                            key={index}
                            artistName={card.stageName}
                            imageUrl={card.artistImage}
                            profileUrl={`/artist/id/${card._id}`}
                        />
                    ))}
                </div>

                {/* Music Genres Section */}
                <h1 className="text-3xl font-bold text-center text-white mb-8 pt-24">Music Genres</h1>
                <div className="flex flex-wrap justify-center">
                    {genres.slice(0, 5).map((genre, index) => (
                        <GenreCards
                            key={index}
                            genreName={genre.genreName}
                            description={genre.description}
                            imageUrl={genre.artwork}
                            genreId={genre._id}
                        />
                    ))}
                </div>



                {/* Playlist Section for test */}
                <h1 className="text-3xl font-bold text-center text-white mb-8 pt-24">Our Playlists</h1>
                <div className="flex flex-wrap justify-center">
                    {playlist.slice(0, 5).map((genre, index) => (
                        <PlaylistCards
                            key={index}
                            genreName={genre.name}
                            description={genre.description}
                            imageUrl={genre.artwork}
                            genreId={genre._id}
                        />
                    ))}
                </div>


            </div>
        </Layout>
    );
}

export default Homepage;
