import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { topArtistsData } from "../components/cards/artistsData";
import { topTracksData } from "../components/cards/topTracks";
import { GenreCards } from "../components/shared/GenreCards";
import { fetchGenre, fetchPlaylist } from "../components/cards/genreData";
import { LazySlider } from "../components/shared/NewReleasesCard";
import { slides } from "../components/cards/NewReleaseData";
import { ArtistCard } from "../components/shared/ArtistCards";
import { PlaylistCards } from "../components/shared/playlistCard";
import TrackView from "../components/shared/trackView";
import { Link } from "react-router-dom";
import { TailSpin } from 'react-loader-spinner'; // Import the spinner

const Homepage = () => {
    const [genres, setGenres] = useState([]);
    const [artists, setArtist] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [songData, setsongData] = useState([]);

    // Loading states for each section
    const [loadingGenres, setLoadingGenres] = useState(true);
    const [loadingArtists, setLoadingArtists] = useState(true);
    const [loadingPlaylist, setLoadingPlaylist] = useState(true);
    const [loadingSongs, setLoadingSongs] = useState(true);

    useEffect(() => {
        const getGenres = async () => {
            try {
                const genreData = await fetchGenre();
                setGenres(genreData);
                setLoadingGenres(false); // stop loading
            } catch (error) {
                console.error("Error fetching genres:", error);
                setLoadingGenres(false); // stop loading in case of error
            }
        };

        const getArtist = async () => {
            try {
                const artistData = await topArtistsData();
                setArtist(artistData);
                setLoadingArtists(false); // stop loading
            } catch (error) {
                console.error("Error fetching artists:", error);
                setLoadingArtists(false); // stop loading in case of error
            }
        };

        const getPlaylist = async () => {
            try {
                const playlistData = await fetchPlaylist();
                setPlaylist(playlistData.playlists);
                setLoadingPlaylist(false); // stop loading
            } catch (error) {
                console.error("Error occurred.", error);
                setLoadingPlaylist(false); // stop loading in case of error
            }
        };

        const getAllSongs = async () => {
            try {
                const tracksData = await topTracksData();
                setsongData(tracksData);
                setLoadingSongs(false); // stop loading
            } catch (error) {
                console.log("Error occurred while fetching top tracks: ", error);
                setLoadingSongs(false); // stop loading in case of error
            }
        };

        getArtist();
        getGenres();
        getPlaylist();
        getAllSongs();
    }, []);

    const sortedtop5 = songData.toSorted((a, b) => b.plays - a.plays);

    return (
        <Layout>
            <div className='bg-app-color pb-16'>
                <div className="pt-8">
                    <LazySlider slides={slides} />
                </div>

                <div className="text-3xl font-bold text-center text-white mb-8 pt-24">
                    <div>Top 5 Tracks</div>
                </div>
                <div className="flex flex-wrap justify-center">
                    {loadingSongs ? (
                        <TailSpin visible={true} height="80" width="80" color="#F97316" />
                    ) : (
                        <>
                            {sortedtop5.slice(0, 5).map((card, index) => (
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
                        </>
                    )}
                </div>

                <div className="flex flex-col flex-wrap justify-center items-center pt-24 mb-4">
                    <div className="text-3xl font-bold text-white z-10">
                        Latest Releases
                    </div>

                    <div className="pt-2 text-xs font-semibold text-gray-400 z-10 hover:text-gray-200">
                        <Link to={"/releases"}>VIEW ALL</Link>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center">
                    {loadingSongs ? (
                        <TailSpin visible={true} height="80" width="80" color="#F97316" />
                    ) : (
                        <>
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
                        </>
                    )}
                </div>

                <h1 className="text-3xl font-bold text-center mb-8 text-white pt-24">Our Artists</h1>
                <div className="flex flex-wrap justify-center">
                    {loadingArtists ? (
                        <TailSpin visible={true} height="80" width="80" color="#F97316" />
                    ) : (
                        <>
                            {artists.slice(0, 5).map((card, index) => (
                                <ArtistCard
                                    key={index}
                                    artistName={card.stageName}
                                    imageUrl={card.artistImage}
                                    profileUrl={`/artist/id/${card._id}`}
                                />
                            ))}
                        </>
                    )}
                </div>

                <h1 className="text-3xl font-bold text-center text-white mb-8 pt-24">Music Genres</h1>
                <div className="flex flex-wrap justify-center">
                    {loadingGenres ? (
                        <TailSpin visible={true} height="80" width="80" color="#F97316" />
                    ) : (
                        <>
                            {genres.slice(0, 5).map((genre, index) => (
                                <GenreCards
                                    key={index}
                                    genreName={genre.genreName}
                                    description={genre.description}
                                    imageUrl={genre.artwork}
                                    genreId={genre._id}
                                />
                            ))}
                        </>
                    )}
                </div>

                <h1 className="text-3xl font-bold text-center text-white mb-8 pt-24">Our Playlists</h1>
                <div className="flex flex-wrap justify-center">
                    {loadingPlaylist ? (
                        <TailSpin visible={true} height="80" width="80" color="#F97316" />
                    ) : (
                        <>
                            {playlist.slice(0, 5).map((playlist, index) => (
                                <PlaylistCards
                                    key={index}
                                    genreName={playlist.name}
                                    description={playlist.description}
                                    imageUrl={playlist.artwork}
                                    genreId={playlist._id}
                                />
                            ))}
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default Homepage;
