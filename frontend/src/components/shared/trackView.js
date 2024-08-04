import React from "react";
import "./HomeCards.css";
import { Link } from "react-router-dom";

const TrackView = ({ text, urlImage, artist, genre, id }) => {
    const containerStyle = {
        backgroundImage: `url(${urlImage})`,
        filter: `blur(16px)`,
    };

    return (
        <div className="p-2">

            <div className="home-card-container ">
                <div className="home-card bg-slate-800 shadow-lg pt-8">
                    <div className="background-image" style={containerStyle}></div>
                    <div className="flex items-center justify-center">
                        <img src={urlImage} alt="Home Card" className="w-44 h-44 object-cover" />
                    </div>
                    <div className="flex justify-center items-center flex-col">
                        <div className="font-semibold text-white text-center pt-4 overflow-auto">
                            <Link to={`/track/${id}`} className="text-white hover:text-slate-300">
                                {text}
                            </Link>
                        </div>
                        <p className="font-normal text-white text-center text-ellipsis">{artist}</p>
                        <p className="bg-orange-500 text-sm font-extralight text-white rounded m-0.5 px-0.5">{genre}</p>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default TrackView;