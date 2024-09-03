import Layout from "../../layouts/Layout";
import { useEffect, useState } from "react";
import { unauthenticatedGETRequest } from "../../utils/ServerHelpers";
import { Link, useParams } from "react-router-dom";
import TrackView from "../shared/trackView";
import { Helmet } from "react-helmet";
import { Icon } from "@iconify/react";
import "../shared/NewReleaseCards.css";
import { toast } from "react-toastify";

const ArtistPage = () => {
    const { artistId } = useParams();
    const [artistData, setartistData] = useState({});
    const [songsData, setsongsData] = useState([]);
    const [similarArtists, setSimilarArtists] = useState([]);

    useEffect(() => {
        const fetchArtistData = async () => {
            try {
                const userDetail = await unauthenticatedGETRequest(`/artist/id/${artistId}`);
                setartistData(userDetail || {});
                
            } catch (error) {
                toast.error("Error while fetching artist data", error);
            }
        }

        const fetchTrackByArtist = async () => {
            try {
                const tracksData = await unauthenticatedGETRequest(`/artist/tracks/${artistId}`);

                if (!tracksData || tracksData.length === 0) {
                    setsongsData([]);
                    toast.error("No Data to Show.");
                } else {
                    setsongsData(tracksData);
                }
            } catch (error) {
                toast.error("No Data to Show.");
                setsongsData([]);
            }
        }

        const fetchSimilarArtists = async () => {
            try {
                const similarArtistsData = await unauthenticatedGETRequest(`/artist/similar/${artistId}`);
                setSimilarArtists(similarArtistsData || []);
                
            } catch (error) {
                toast.error("Error while fetching similar artists", error);
            }
        }

        if (artistId) {
            fetchArtistData();
            fetchTrackByArtist();
            fetchSimilarArtists();
        }
    }, [artistId]);

    return (
        <Layout>
            <Helmet>
                <title>{artistData.stageName || "Artist Page"}</title>
            </Helmet>
            <div
                className="background-release-image"
                style={{ backgroundImage: `url(${artistData.artistImage})` }}
            ></div>
            <div className="flex flex-col items-center w-full content-release-box">
                <div className="relative mt-8 w-5/6">
                    {/* Line in the middle */}
                    <div className="border-t absolute left-0 right-0 top-1/2 transform -translate-y-1/2 z-0 drop-shadow-lg"></div>

                    {/* Artist Image */}
                    <img
                        src={artistData.artistImage}
                        alt={artistData.stageName}
                        className="h-60 w-60 object-cover rounded-full border-4 border-orange-400 z-10 mx-auto relative drop-shadow-lg"
                    />
                </div>

                <div className="text-center">
                    {/* Artist Name */}
                    <div className="text-4xl font-bold mt-4">
                        {artistData.stageName}
                    </div>

                    {/* Social Media Links */}
                    <div className="flex justify-center space-x-4 mt-6">
                        {artistData.socialLinks && (
                            <>
                                {artistData.socialLinks.twitter && artistData.socialLinks.twitter.length > 0 && (
                                    <a href={artistData.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                                        <div className="flex items-center justify-center p-2 border rounded-md hover:bg-blue-500 hover:bg-opacity-20 transition duration-300 ease-in-out">
                                            <Icon icon="devicon:twitter" className="h-8 w-8 text-blue-500" />
                                        </div>
                                    </a>
                                )}
                                {artistData.socialLinks.instagram && artistData.socialLinks.instagram.length > 0 && (
                                    <a href={artistData.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                                        <div className="flex items-center justify-center p-2 border rounded-md hover:bg-pink-500 hover:bg-opacity-20 transition duration-300 ease-in-out">
                                            <Icon icon="skill-icons:instagram" className="h-8 w-8 text-pink-500" />
                                        </div>
                                    </a>
                                )}
                                {artistData.socialLinks.youtube && artistData.socialLinks.youtube.length > 0 && (
                                    <a href={artistData.socialLinks.youtube} target="_blank" rel="noopener noreferrer">
                                        <div className="flex items-center justify-center p-2 border rounded-md hover:bg-red-500 hover:bg-opacity-20 transition duration-300 ease-in-out">
                                            <Icon icon="logos:youtube-icon" className="h-8 w-8 text-red-500" />
                                        </div>
                                    </a>
                                )}
                                {artistData.socialLinks.soundcloud && artistData.socialLinks.soundcloud.length > 0 && (
                                    <a href={artistData.socialLinks.soundcloud} target="_blank" rel="noopener noreferrer">
                                        <div className="flex items-center justify-center p-2 border rounded-md hover:bg-orange-500 hover:bg-opacity-20 transition duration-300 ease-in-out">
                                            <Icon icon="logos:soundcloud" className="h-8 w-8 text-orange-500" />
                                        </div>
                                    </a>
                                )}
                                {artistData.socialLinks.spotify && artistData.socialLinks.spotify.length > 0 && (
                                    <a href={artistData.socialLinks.spotify} target="_blank" rel="noopener noreferrer">
                                        <div className="flex items-center justify-center p-2 border rounded-md hover:bg-green-500 hover:bg-opacity-20 transition duration-300 ease-in-out">
                                            <Icon icon="logos:spotify-icon" className="h-8 w-8 text-green-500" />
                                        </div>
                                    </a>
                                )}
                            </>
                        )}
                    </div>
                </div>

                <div className="flex flex-col flex-wrap justify-center font-poppins m-4 w-4/5 ">
                    <div className="text-2xl">
                        About {artistData.stageName}
                    </div>
                    <div className="text-gray-300">
                        {artistData.bio || "No biography available for this artist."}
                    </div>
                </div>

                <div className="w-full text-center mt-8 mb-8 text-3xl font-bold">
                    Top Tracks By Artist
                </div>
                <div className="flex flex-wrap justify-center w-5/6">
                    {songsData.length > 0 ? (
                        songsData.slice(0, 3).map((card, index) => (
                            <TrackView
                                key={index}
                                id={index}
                                all={card}
                                urlImage={card.albumArt}
                                text={card.title}
                                genre={card.genre}
                                artist={card.artist}
                            />
                        ))
                    ) : (
                        <div className="text-gray-500">No top tracks available for this artist.</div>
                    )}
                </div>

                <div className="w-full text-center mt-8 mb-8 text-3xl font-bold">
                    Discography
                </div>
                <div className="flex flex-wrap justify-center w-5/6">
                    {songsData.length > 0 ? (
                        songsData.map((card, index) => (
                            <TrackView
                                key={index}
                                id={index}
                                all={card}
                                urlImage={card.albumArt}
                                text={card.title}
                                genre={card.genre}
                                artist={card.artist}
                            />
                        ))
                    ) : (
                        <div className="text-gray-500">No discography available for this artist.</div>
                    )}
                </div>

                {/* Similar Artists Section */}
                <div className="w-full text-center mt-8 mb-8 text-3xl font-bold">
                    Similar Artists
                </div>
                <div className="flex flex-wrap justify-center w-5/6">
                    {
                        similarArtists.map((artist, index) => (
                            <Link key={index} to={`/artist/id/${artist._id}`}>
                                <div className="flex flex-col items-center m-4">
                                    <img
                                        src={artist.artistImage}
                                        alt={artist.stageName}
                                        className="h-40 w-40 object-cover rounded-full border-4 border-orange-400"
                                    />
                                    <div className="text-center mt-2 font-bold text-lg">
                                        {artist.stageName}
                                    </div>
                                </div>
                            </Link>
                        )
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default ArtistPage;
