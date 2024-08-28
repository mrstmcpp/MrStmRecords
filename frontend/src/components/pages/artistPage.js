import Layout from "../../layouts/Layout";
import { useEffect, useState } from "react";
import { unauthenticatedGETRequest } from "../../utils/ServerHelpers";
import { useParams } from "react-router-dom";
import TrackView from "../shared/trackView";
import { Helmet } from "react-helmet";
import { Icon } from "@iconify/react"; 
import "../shared/NewReleaseCards.css";

const ArtistPage = () => {
    const { artistId } = useParams();
    const [artistData, setartistData] = useState([]);
    const [songsData, setsongsData] = useState([]);

    useEffect(() => {
        const fetchArtistData = async () => {
            try {
                const userDetail = await unauthenticatedGETRequest(`/artist/id/${artistId}`);
                setartistData(userDetail || []);
                console.log(userDetail);
            } catch (error) {
                console.log("Error while fetching artist data", error);
            }
        }

        const fetchTrackByArtist = async () => {
            try {
                const tracksData = await unauthenticatedGETRequest(`/artist/tracks/${artistId}`);

                if (!tracksData || tracksData.length === 0) {
                    setsongsData([]);
                    console.log("No tracks available for this artist.");
                } else {
                    setsongsData(tracksData);
                    console.log(tracksData);
                }
            } catch (error) {
                console.log("Error while fetching songs", error);
            }
        }

        if (artistId) {
            fetchArtistData();
            fetchTrackByArtist();
        }
    }, [artistId]);

    return (
        <Layout>
            <Helmet>
                <title>{artistData.stageName}</title>
            </Helmet>
                <div
                    className="background-release-image"
                    style={{ backgroundImage: `url(${artistData.artistImage})` }}
                ></div>
            <div className="flex flex-col items-center w-full content-release-box">
                <div className="relative mt-8 w-5/6">
                    {/* Line in the middle */}
                    <div className="border-t absolute left-0 right-0 top-1/2 transform -translate-y-1/2 z-0"></div>

                    {/* Artist Image */}
                    <img
                        src={artistData.artistImage}
                        alt={artistData.stageName}
                        className="h-60 w-60 object-cover rounded-full border-4 border-orange-400 z-10 mx-auto relative"
                    />
                </div>

                <div className="text-center">
                    {/* Artist Name */}
                    <div className="text-4xl font-bold mt-4">
                        {artistData.stageName}
                    </div>

                    {/* Social Media Links */}
                    <div className="flex justify-center space-x-4 mt-6">
                        {artistData && artistData.socialLinks && (
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
                        {artistData.bio}
                    </div>
                </div>

                <div className="w-full text-center mt-8 mb-8 text-3xl font-bold">
                    Top Tracks By Artist
                </div>
                <div className="flex flex-wrap justify-center w-5/6">
                    {songsData.slice(0, 3).map((card, index) => (
                        <TrackView
                            key={index}
                            id={index}
                            all={card}
                            urlImage={card.albumArt}
                            text={card.title}
                            genre={card.genre}
                            artist={card.artist}
                        />
                    ))}
                </div>

                <div className="w-full text-center mt-8 mb-8 text-3xl font-bold">
                    Discography
                </div>
                <div className="flex flex-wrap justify-center w-5/6">
                    {songsData.map((card, index) => (
                        <TrackView
                            key={index}
                            id={index}
                            all={card}
                            urlImage={card.albumArt}
                            text={card.title}
                            genre={card.genre}
                            artist={card.artist}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default ArtistPage;
