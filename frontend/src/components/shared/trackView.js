import React, { useState, useContext, useEffect , useRef } from "react";
import "./HomeCards.css";
import "./Ribbon.css"
import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';
import playerContext from "../../contexts/playerContexts";
import { ClickToShare } from "../misc/ClickToShare";
import { TailSpin, Audio } from 'react-loader-spinner';

const TrackView = ({ text, urlImage, artist, genre, id, all }) => {
    const { currSong, setCurrSong } = useContext(playerContext);
    const [loading, setLoading] = useState(false);
    const [currImage, setCurrImage] = useState(urlImage);

    const imgRef = useRef(null);
    const containerStyle = {
        backgroundImage: `url(${currImage})`,
        filter: `blur(70px)`,
        backgroundColor: `rgba(0, 0, 0, 0.5)`,
    };

    useEffect(() => {
        setCurrImage(urlImage);

        if (imgRef.current && imgRef.current.complete) {
            // Already loaded from cache
            setLoading(false);
        }
    }, [urlImage]);

    return (
        <div className="p-2">
            <div className="home-card-container">
                <div className="home-card bg-slate-800 shadow-lg pt-8 relative">
                    {loading ? (
                        <div className="absolute inset-0 flex justify-center items-center bg-slate-800 bg-opacity-75">
                            <Audio
                                visible={true}
                                height="40"
                                width="40"
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
                            <div
                                className={`ribbon ${all.songType === "Remix"
                                    ? "bg-cyan-400"
                                    : all.songType === "Cover"
                                        ? "bg-orange-500"
                                        : "bg-green-500"
                                    }`}
                            >{all.songType}</div>
                            <div className="flex items-center justify-center">
                                <Link to={`/track/${id}`}>
                                    <img
                                        ref={imgRef} 
                                        src={urlImage} 
                                        alt={text} 
                                        className="w-44 h-44 object-cover"
                                        style={{
                                            opacity: 0,
                                            transform: 'scale(0.95)',
                                            animation: 'fadeInScale 0.6s ease-out forwards'
                                        }}
                                        loading="lazy"
                                        onLoad={() => setLoading(false)}
                                    />
                                </Link>
                            </div>
                            <div className="flex justify-center items-center flex-col">
                                <div className="description font-semibold text-white text-center pt-6 text-ellipsis overflow-auto p-1.5">
                                    <Link key={text} to={`/track/${id}`} className="text-white hover:text-slate-300">
                                        {text}
                                    </Link>
                                </div>
                                <div className="font-semibold text-xs text-white text-center pt-4 pb-1">
                                    {artist.map((element, index) => (
                                        <>
                                            <Link
                                                key={element._id}
                                                to={`/artist/id/${element._id}`}>
                                                {element.stageName}
                                            </Link>
                                            {index < artist.length - 1 && ', '}
                                        </>
                                    ))
                                    }
                                </div>
                                <div className="flex flex-wrap gap-2 mt-3 py-1">
                                    {genre.map((g) => (
                                        <p
                                            key={g._id}
                                            className="bg-slate-500 font-mono text-white uppercase rounded px-1.5"
                                            style={{ fontSize: '10px', fontWeight: 80 }}
                                        >
                                            <Link to={`/genre/${g._id}`}>
                                                {g.name}
                                            </Link>
                                        </p>
                                    ))}
                                </div>
                                <div className="border w-full mt-3 border-slate-500 opacity-30"></div>
                                <div className="flex w-full justify-around opacity-60">
                                    <button className="text-gray-400 hover:text-white hover:cursor-pointer mt-2 " title="Play" onClick={() => setCurrSong(all)}>
                                        <Icon icon="mdi:play" className='w-6 h-6' />
                                    </button>
                                    <div className="text-gray-400 hover:text-white hover:cursor-pointer mt-2" title="Add to Queue">
                                        <Icon icon="ph:queue-bold" className='w-6 h-6' />
                                    </div>
                                    <div className="text-gray-400 hover:text-white hover:cursor-pointer mt-2" title="Share" onClick={() => ClickToShare(all, 'track')}>
                                        <Icon icon="ic:round-share" className='w-6 h-6' />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TrackView;
