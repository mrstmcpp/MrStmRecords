import React from "react";
import "./HomeCards.css";
import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';

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
                        <p className="bg-orange-500 text-sm font-extralight text-white rounded mt-3 px-1">{genre}</p>
                        <div className="border w-full mt-3 border-slate-500 opacity-30"></div>
                        <div className="flex w-full justify-around opacity-60">
                            <div className="text-gray-400 hover:text-white hover:cursor-pointer mt-2 ">
                                <Icon icon="mdi:play" className='w-6 h-6'/>
                            </div>
                            <div className="text-gray-400 hover:text-white hover:cursor-pointer mt-2">
                                <Icon icon="ph:queue-bold" className='w-6 h-6'/>
                            </div>
                            <div className="text-gray-400 hover:text-white hover:cursor-pointer mt-2">
                                <Icon icon="ic:round-share" className='w-6 h-6'/>
                            </div>

                        </div>


                    </div>
                </div>

            </div>
        </div>
    );
};

export default TrackView;