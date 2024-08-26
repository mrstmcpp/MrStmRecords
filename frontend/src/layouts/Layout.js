import React, { useState, useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import playerContext from "../contexts/playerContexts"

import { Icon } from '@iconify/react';
import { Howl, Howler } from 'howler';
import { Link } from "react-router-dom";


const Layout = ({ children }) => {
    const { currSong, setCurrentSong } = useContext(playerContext);


    const [soundPlayed, setsoundPlayed] = useState(null);
    const [isPaused, setIsPaused] = useState(true);

    const playSong = (source) => {
        if (soundPlayed) {
            soundPlayed.stop();
            setIsPaused(false);
        }
        let sound = new Howl({
            src: source
        });

        setsoundPlayed(sound);
        setIsPaused(false);
        sound.play();
    }

    const pauseSong = () => {
        soundPlayed.pause();
        setIsPaused(true)
    }

    const togglePlayPause = () => {
        if (isPaused) {
            playSong(currSong.trackUrl);
        } else {
            pauseSong();
        }
    }

    return (
        <>
            <Header />
            {/* Added flex, justify-center, and items-center to center content */}
            <div className="bg-app-color ">
                {children}
            </div>

            <div>
                {currSong && (

                    <div className="relative z-10 flex items-center bg-gray-800 p-4 rounded-lg shadow-md w-full max-w-2xl">

                        <div className="w-20 h-20 bg-gray-600 rounded-lg overflow-hidden">
                            <Link to={`/track/${currSong._id}`}>
                                <img
                                    src={currSong.albumArt}
                                    alt={currSong.title}
                                    className="w-full h-full object-cover"
                                />
                            </Link>
                        </div>


                        <div className="flex flex-col flex-grow ml-4">
                            <div className="text-lg text-white font-semibold">

                                <Link to={`/track/${currSong._id}`}>
                                    {currSong.title}
                                </Link>
                            </div>
                            <div className="text-sm font-semibold text-gray-400">
                                <Link to={`/artist/id/${currSong.artist._id}`}>
                                    {currSong.artist.stageName}
                                </Link>
                            </div>
                            <div className="text-sm font-extralight text-white">{currSong.genre}</div>
                        </div>


                        <div className="flex items-center space-x-4">
                            <button className="text-white hover:text-gray-400">
                                <Icon icon="f7:backward-end-fill" />
                            </button>
                            <button className="text-white hover:text-gray-400" onClick={togglePlayPause}>
                                {isPaused ? <Icon icon="mdi:play" /> : <Icon icon="mdi:pause" />}

                            </button>
                            <button className="text-white hover:text-gray-400">
                                <Icon icon="f7:forward-end-fill" />
                            </button>
                        </div>
                    </div>
                )
                }
            </div>
            <Footer />
        </>
    );
};

export default Layout;
