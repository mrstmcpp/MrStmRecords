import React from "react";
import "./HomeCards.css";

export const HomeCards = ({ text, urlImage, artist, genre }) => {
    const containerStyle = {
        backgroundImage: `url(${urlImage})`,
        filter: `blur(16px)`,
    };

    

    return (
        
        <div className="home-card-container">
            
            <div className="home-card bg-slate-800 shadow-lg pt-8">
                <div className="background-image" style={containerStyle}></div>
                <div className="flex items-center justify-center">
                    <img src={urlImage} alt="Home Card" className="w-44 h-44 object-cover" />
                </div>
                <div className="flex justify-center items-center flex-col">
                    <div className="font-bold text-white text-center pt-4">{text}</div>
                    <p className="font-normal text-white text-center overflow-auto">{artist}</p>
                    <p className="bg-orange-300 text-rev-color rounded font-thin m-1 px-1">{genre}</p>
                    <div className="p-4">
                        <hr className="border-gray-500 mt-2" />
                    </div>
                </div>
            </div>
            
        </div>
    );
};
