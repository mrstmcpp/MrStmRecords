import React, { useState, useEffect } from "react";
import "./HomeCards.css";
import { Link } from "react-router-dom";
import { TailSpin } from 'react-loader-spinner';

export const ArtistCard = ({ artistName, profileUrl, imageUrl }) => {
    const [loading, setLoading] = useState(true);

    const containerStyle = {
        backgroundImage: `url(${imageUrl})`,
        filter: `blur(70px)`,
        backgroundColor: `rgba(0, 0, 0, 0.5)`,
    };

    useEffect(() => {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => setLoading(false); 
    }, [imageUrl]);

    return (
        <div className="p-2">
            <Link to={profileUrl}>
                <div className="home-card-container-artist rounded-lg">
                    <div className="home-card bg-slate-800 shadow-lg pt-8 relative">
                        {loading ? (
                            <div className="absolute inset-0 flex justify-center items-center bg-slate-800 bg-opacity-75">
                                <TailSpin
                                    visible={true}
                                    height="50"
                                    width="50"
                                    color="#F97316"
                                    ariaLabel="tail-spin-loading"
                                    radius="1"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                />
                            </div>
                        ) : (
                            <>
                                <div className="background-image" style={containerStyle}></div>
                                <div className="flex items-center justify-center">
                                    <img src={imageUrl} alt="Artist Card" className="w-48 h-48 object-cover rounded-full" />
                                </div>
                                <div className="flex justify-center items-center flex-col">
                                    <div className="font-semibold text-white text-center pt-4">
                                        {artistName}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
};
