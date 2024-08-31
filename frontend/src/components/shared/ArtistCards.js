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
            <Link to={profileUrl}>
                <div className="home-card-container-artist rounded-lg " >

                    <div className="home-card bg-slate-800 shadow-lg pt-8">
                        <div className="background-image" style={containerStyle}></div>
                        <div className="flex items-center justify-center">
                            <img src={imageUrl} alt="Home Card" className="w-48 h-48 object-cover rounded-full" />
                        </div>
                        <div className="flex justify-center items-center flex-col">
                            <div className="font-semibold text-white text-center pt-4">
                                {artistName}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};
