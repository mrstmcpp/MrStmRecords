import Layout from "../../layouts/Layout";
import { useEffect, useState } from "react";
import { unauthenticatedGETRequest } from "../../utils/ServerHelpers";
import { Link, useParams } from "react-router-dom";
import TrackView from "../shared/trackView";
import { Helmet } from "react-helmet";
import { Icon } from "@iconify/react";
import "../shared/NewReleaseCards.css";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const ArtistPage = () => {
    const { artistId } = useParams();
    const [artistData, setartistData] = useState({});
    const [tracksData, setTracksData] = useState([]);
    const [similarArtists, setSimilarArtists] = useState([]);
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArtistData = async () => {
            try {
                const userDetail = await unauthenticatedGETRequest(`/artist/${artistId}`);
                
                if (!userDetail || userDetail.error || !userDetail._id) {
                    toast.error("Artist not found.");
                    navigate("/");
                    return;
                }
                setartistData(userDetail)
            } catch (error) {
                toast.error("Error while fetching artist data");
                navigate("/");
            }
        }

        const fetchTrackByArtist = async () => {
            try {
                const tracks = await unauthenticatedGETRequest(`/artist/${artistId}/tracks`);
                setTracksData(tracks);
                console.log(tracks)
            } catch (error) {
                toast.error("No Data to Show.");
            }
        }

        // const fetchSimilarArtists = async () => {
        //     try {
        //         const similarArtistsData = await unauthenticatedGETRequest(`/artist/similar/${artistId}`);
        //         setSimilarArtists(similarArtistsData || []);
        //     } catch (error) {
        //         toast.error("Error while fetching similar artists", error);
        //     }
        // }

        if (artistId) {
            setLoading(true); // Set loading to true before fetching data
            Promise.all([fetchArtistData(), fetchTrackByArtist()])
                .then(() => setLoading(false)) // Set loading to false after data is fetched
                .catch(() => setLoading(false));
        }
    }, [artistId , navigate]);

    const sortedtop5 = tracksData.toSorted((a, b) => b.plays - a.plays);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <TailSpin
                    visible={true}
                    height="80"
                    width="80"
                    color="#F97316"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                />
            </div>
        );
    }

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
                        style={{ opacity: 0, transform: 'scale(0.95)', animation: 'fadeInScale 0.6s ease-out forwards' }}

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
                                {artistData.socialLinks.website && artistData.socialLinks.website.length > 0 && (
                                    <a href={artistData.socialLinks.website} target="_blank" rel="noopener noreferrer">
                                        <div className="flex items-center justify-center p-2 border rounded-md hover:bg-slate-500 hover:bg-opacity-20 transition duration-300 ease-in-out">
                                            <Icon icon="mdi:web" className="h-8 w-8" />
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
                    {sortedtop5.length > 0 ? (
                        sortedtop5.map((card, index) => (
                            <TrackView
                                key={index}
                                id={card._id}
                                all={card}
                                urlImage={card.albumArt}
                                text={card.title}
                                genre={card.genre}
                                artist={card.artists}
                            />
                        ))
                    ) : (
                        <div className="text-gray-500">No top tracks available for this artist.</div>
                    )}
                </div>

                <div className="w-full text-center mt-8 mb-8 text-3xl font-bold">
                    Discography
                </div>
                {/* <div className="flex flex-wrap justify-center w-5/6">
                    {songsData.length > 0 ? (
                        songsData.reverse().map((card, index) => (
                            <TrackView
                                key={index}
                                id={card._id}
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
                </div> */}

                {/* <div className="w-full text-center mt-8 mb-8 text-3xl font-bold">
                    Similar Artists
                </div>
                <div className="flex flex-wrap justify-center w-5/6">
                    {similarArtists.length > 0 ? (
                        similarArtists.slice(0, 5).map((artist, index) => (
                            <Link
                                key={artist._id}
                                to={`/artist/id/${artist._id}`}
                                className="cursor-pointer text-gray-400 hover:text-white transition duration-300 ease-in-out"
                            >
                                <div className="flex flex-col items-center m-4">
                                    <img
                                        src={artist.artistImage}
                                        alt={artist.stageName}
                                        className="h-40 w-40 object-cover rounded-full border-4 border-orange-400"
                                    />
                                    <div className="text-center mt-2 font-bold text-lg">{artist.stageName}</div>

                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="text-gray-500">No similar artists available.</div>
                    )}
                </div> */}
            </div>
        </Layout>
    );
};

export default ArtistPage;




// {/* Similar Artists Section */}
// <div className="w-full text-center mt-8 mb-8 text-3xl font-bold">
// Similar Artists
// </div>
// <div className="flex flex-wrap justify-center w-5/6">
// {
//     similarArtists.map((artist, index) => (
//         <Link key={index} to={`/artist/id/${artist._id}`}>
//             <div className="flex flex-col items-center m-4">
//                 <img
//                     src={artist.artistImage}
//                     alt={artist.stageName}
//                     className="h-40 w-40 object-cover rounded-full border-4 border-orange-400"
//                 />
//                 <div className="text-center mt-2 font-bold text-lg">
//                     {artist.stageName}
//                 </div>
//             </div>
//         </Link>
//     )
// )}
// </div>