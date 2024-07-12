import React from "react";
import "./HomeCards.css";

export const GenreCards = ({ genreName , description , imageUrl }) => {
    const containerStyle = {
        backgroundImage: `url(${imageUrl})`,
        filter: `blur(16px)`,
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
                    <div className="font-bold text-white text-center pt-4">{genreName}</div>
                    <p className="font-normal text-white text-center overflow-auto">{description}</p>
                    
                </div>
            </div>
        </div>
        </div>
    );
};
