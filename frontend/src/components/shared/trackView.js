import React from "react";
import "./HomeCards.css";
import { Link } from "react-router-dom";

const TrackView = ({ text, urlImage, artist, genre, id }) => {
    const containerStyle = {
        backgroundImage: `url(${urlImage})`,
        filter: `blur(70px)`,
        backgroundColor: `rgba(0, 0, 0, 0.5)`,
    };

    return (
        <div className="p-4">

            <div className="home-card-container ">
                <div className="home-card bg-slate-800 shadow-lg pt-8">
                    <div className="background-image" style={containerStyle}></div>
                    <div className="flex items-center justify-center">
                        <Link to={`/track/${id}`}>
                            <img src={urlImage} alt="Home Card" className="w-44 h-44 object-cover" />
                        </Link>
                    </div>
                    <div className="flex justify-center items-center flex-col">
                        <div className="description font-semibold text-white text-center pt-6 text-ellipsis overflow-auto p-1.5">
                            <Link to={`/track/${id}`} className="text-white hover:text-slate-300">
                                {text}
                            </Link>
                        </div>
                        <p className="font-normal text-white text-center pt-4">
                            <Link to={`/artist/${artist._id}`}>
                                {artist.stageName}
                            </Link>
                        </p>
                        <p className="bg-orange-500 text-sm font-extralight text-white rounded m-4 px-1">{genre}</p>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default TrackView;