import React from "react";
import "./HomeCards.css";
import { Link } from "react-router-dom";

export const GenreCards = ({ genreName, description, imageUrl, genreId }) => {
    const containerStyle = {
        backgroundImage: `url(${imageUrl})`,
        filter: `blur(70px)`,
        backgroundColor: `rgba(0, 0, 0, 0.5)`,
    };
    const genId = genreId;
    return (
        <div className="p-2">
            <div className="home-card-container">
                <div className="home-card bg-slate-800 shadow-lg pt-8">
                    <div className="background-image" style={containerStyle}></div>
                    <div className="flex items-center justify-center">
                        <Link to={`/genre/${genId}`} className="text-white hover:text-slate-300">
                            <img src={imageUrl} alt="Home Card" className="w-44 h-44 object-cover" />
                        </Link>
                    </div>
                    <div className="flex justify-center items-center flex-col">
                        <div className="font-semibold text-center pt-4">
                            <Link to={`/genre/${genId}`} className="text-white hover:text-slate-300">
                                {genreName}
                            </Link>
                        </div>
                        <p className="description font-normal text-white text-center overflow-auto">{description}</p>
                        <div className="border w-full mt-10 border-slate-500 opacity-30"></div>
                        <Link to={`/genre/${genId}`} className="text-center items-center mt-2">
                            <div className="text-white font-semibold hover:text-orange-300">
                                Explore
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
