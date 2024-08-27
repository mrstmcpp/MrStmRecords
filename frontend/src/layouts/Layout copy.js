import React, { useState, useContext, useLayoutEffect, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import playerContext from "../contexts/playerContexts";

import { Icon } from "@iconify/react";
import { Howl } from "howler";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
    const { currSong, setCurrentSong } = useContext(playerContext);

    const [isOpen, setIsOpen] = useState(true);
    const [soundPlayed, setsoundPlayed] = useState(null);
    const [isPaused, setIsPaused] = useState(true);
    const firstUpdateBypass = useRef(true);

    useLayoutEffect(() => {
        if(firstUpdateBypass.current){
            firstUpdateBypass.current = false;
            return;
        }
        if (currSong) {
            setIsOpen(true);
            changeSong(currSong.trackUrl);
        }else{
            return;
        }
        
    }, [currSong && currSong.track]); 


    const playSong = () => {
        if (!soundPlayed) {
            return;
        }
        if (isPaused) {
            soundPlayed.play();
            setIsPaused(false); 
        }
    };
    
    const changeSong = (source) => {
        if (soundPlayed) {
            soundPlayed.stop(); 
        }
        const sound = new Howl({
            src: [source],
            onend: () => {
                setIsPaused(true); 
            }
        });
        setsoundPlayed(sound);
        sound.play();
        setIsPaused(false); 
    };
    
    const pauseSong = () => {
        if (soundPlayed) {
            soundPlayed.pause();
            setIsPaused(true);
        }
    };
    
    const togglePlayPause = () => {
        if (isPaused) {
            playSong(); 
        } else {
            pauseSong();
        }
    };
    
    const toggleClose = () => {
        if (soundPlayed) {
            soundPlayed.stop();
        }
        setIsOpen(false);
        setIsPaused(true);
    };

    return (
        <>
            <Header />

            <div className="bg-app-color ">{children}</div>

            {/* Floating player */}
            {currSong && isOpen && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 p-4 rounded-lg shadow-md w-full max-w-2xl flex items-center z-50">

                    <button
                        className="absolute top-1 right-1 bg-gray-700 rounded text-white hover:text-gray-400 transition duration-300 ease-in-out"
                        onClick={toggleClose}
                    >
                        <Icon icon="charm:cross" className="text-2xl" />
                    </button>

                    <div className="w-20 h-20 bg-gray-600 rounded-lg overflow-hidden">
                        <Link to={`/track/${currSong._id}`}>
                            <img
                                src={currSong.albumArt}
                                alt={currSong.title}
                                className="w-full h-full object-cover hover:opacity-90"
                            />
                        </Link>
                    </div>

                    <div className="flex flex-col flex-grow ml-4">
                        <div className="text-lg text-white font-semibold">
                            <Link to={`/track/${currSong._id}`} className="hover:underline">{currSong.title}</Link>
                        </div>
                        <div className="text-sm font-semibold text-gray-400">
                            <Link to={`/artist/id/${currSong.artist._id}`} className="hover:underline">
                                {currSong.artist.stageName}
                            </Link>
                        </div>
                        <div className="text-sm font-extralight text-white">
                            {currSong.genre}
                        </div>
                    </div>

                    <div className="flex items-center space-x-8 pr-4">
                        <button className="border rounded-3xl text-white hover:text-gray-400 transition duration-300 ease-in-out text-2xl">
                            <Icon icon="f7:backward-end-fill" className="m-1"/>
                        </button>
                        <button
                            className="border rounded-3xl text-white hover:text-gray-400 transition duration-300 ease-in-out text-3xl"
                            onClick={togglePlayPause}
                        >
                            {isPaused ? (
                                <Icon icon="mdi:play" className="m-1"/>
                            ) : (
                                <Icon icon="mdi:pause" className="m-1"/>
                            )}
                        </button>
                        <button className="border rounded-3xl text-white hover:text-gray-400 transition duration-300 ease-in-out text-2xl">
                            <Icon icon="f7:forward-end-fill" className="m-1"/>
                        </button>
                    </div>

                    
                </div>
            )}
            <Footer />
        </>
    );
};

export default Layout;
