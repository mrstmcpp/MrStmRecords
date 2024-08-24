import React from "react";
import "./HomeCards.css";
import { Link } from "react-router-dom";

export const ArtistCard = ({ artistName, profileUrl, imageUrl }) => {
    const containerStyle = {
        backgroundImage: `url(${imageUrl})`,
        filter: `blur(70px)`,
        backgroundColor: `rgba(0, 0, 0, 0.5)`,
    };

    return (
        <div className="p-2">

        <div className="home-card-container">
            <div className="home-card bg-slate-800 shadow-lg pt-8">
                <div className="background-image" style={containerStyle}></div>
                <div className="flex items-center justify-center">
                    <img src={imageUrl} alt="Home Card" className="w-44 h-44 object-cover" />
                </div>
                <div className="flex justify-center items-center flex-col">
                    <div className="font-bold text-white text-center pt-4">{artistName}</div>
                    <p className=" text-white text-center p-4 font-bold">
                        <Link to={profileUrl} className="rounded-lg border p-2 bg-cyan-600 hover:bg-cyan-500">
                            Visit Profile
                        </Link>
                    </p>

                
                </div>
            </div>
        </div>
        </div>
    );
};
