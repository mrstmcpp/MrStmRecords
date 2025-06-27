import Layout from "../../layouts/Layout";
import { useEffect, useState } from "react";
import { unauthenticatedGETRequest } from "../../utils/ServerHelpers";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Icon } from "@iconify/react";
import "../shared/NewReleaseCards.css";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const UserProfilePage = ({ userId }) => {
    const [artistData, setartistData] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArtistData = async () => {
            try {
                const userDetail = await unauthenticatedGETRequest(`/user/${userId}`);
                // console.log(userDetail)
                if (!userDetail || userDetail.error || !userDetail._id) {
                    toast.error("User not found.");
                    navigate("/");
                    return;
                }
                setartistData(userDetail)
            } catch (error) {
                toast.error("Error while fetching user data");
                navigate("/");
            }
        }

        if (userId) {
            setLoading(true); // Set loading to true before fetching data
            Promise.all([fetchArtistData()])
                .then(() => setLoading(false)) // Set loading to false after data is fetched
                .catch(() => setLoading(false));
        }
    }, [userId, navigate]);


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
                <title>{artistData.firstName + artistData.lastName || "Artist Page"}</title>
            </Helmet>
            <div
                className="background-release-image"
                style={{ backgroundImage: `url(${artistData.profilePicture})` }}
            ></div>
            <div className="flex flex-col items-center w-full content-release-box">
                <div className="relative mt-8 w-5/6">
                    {/* Line in the middle */}
                    <div className="border-t border-orange-400 absolute left-0 right-0 top-1/2 transform -translate-y-1/2 z-0 drop-shadow-lg"></div>

                    {/* Artist Image */}
                    <img
                        src={artistData.profilePicture}
                        alt={artistData.stageName}
                        className="h-60 w-60 object-cover rounded-full border-4 border-orange-400 z-10 mx-auto relative drop-shadow-lg"
                        style={{ opacity: 0, transform: 'scale(0.95)', animation: 'fadeInScale 0.6s ease-out forwards' }}

                    />
                </div>

                <div className="text-center">
                    {/* Artist Name */}
                    <div className="text-4xl font-bold mt-4">
                        {artistData.firstName + " " + artistData.lastName}
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

                <div className="flex flex-col font-poppins m-4 w-4/5">
                    <div className="flex flex-row justify-between items-center text-3xl font-semibold mb-6 border-b pb-2 border-orange-400 w-full">
                        <h2 className="text-3xl font-semibold">Artist Profile</h2>
                        <span className="text-sm text-gray-400 font-normal">
                            Artist Since {new Date(artistData.artist.createdAt).toLocaleDateString()}
                        </span>
                    </div>


                    {artistData.artist && Object.keys(artistData.artist).length > 0 ? (
                        <Link
                            to={`/artist/${artistData.artist._id}`}
                            className="text-gray-400 hover:text-white transition duration-300 ease-in-out"
                        >
                            <div className="flex flex-col items-center text-center">
                                <img
                                    src={artistData.artist.artistImage}
                                    alt={artistData.artist.stageName}
                                    className="h-40 w-40 object-cover rounded-full border-4 border-cyan-400 shadow-lg hover:scale-105 transition-transform duration-300"
                                />
                                <div className="mt-3 font-semibold text-lg">{artistData.artist.stageName}</div>
                            </div>
                        </Link>
                    ) : (
                        <p className="text-gray-400 italic mt-2">No artist is linked to this account.</p>
                    )}
                </div>


                <div className="flex flex-col flex-wrap justify-center font-poppins m-4 w-4/5 ">

                    <div className="flex flex-row justify-between items-center text-3xl font-semibold mb-6 border-b pb-2 border-orange-400 w-full">
                        <h2 className="text-3xl font-semibold">Followed Artists</h2>
                        
                    </div>
                    {artistData.followedArtists.length > 0 && (
                        <div className="flex flex-wrap w-5/6">
                            <div className="">
                                {artistData.followedArtists.map((artist) => (
                                    <Link
                                        to={`/artist/${artist._id}`}
                                        key={artist._id}
                                        className="cursor-pointer text-gray-400 hover:text-white transition duration-300 ease-in-out"
                                    >
                                        <div className="flex flex-col items-center m-4">
                                            <img
                                                src={artist.artistImage}
                                                alt={artist.stageName}
                                                className="h-40 w-40 object-cover rounded-full border-4 border-green-400 shadow-lg hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="text-center mt-2 font-bold text-lg">{artist.stageName}</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default UserProfilePage;

