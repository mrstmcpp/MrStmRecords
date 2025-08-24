import React, { useContext, useLayoutEffect, useRef, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import playerContext from "../contexts/playerContexts";
import { Icon } from "@iconify/react";
import { Howl } from "howler";
import { Link } from "react-router-dom";
import "../components/shared/NewReleaseCards.css";
import { unauthenticatedPostRequest } from "../utils/ServerHelpers";

const Layout = ({ children }) => {
    const {
        currSong,
        setCurrSong,
        soundPlayed,
        setSoundPlayed,
        isPaused,
        setIsPaused,
        isPlayerVisible,
        setIsPlayerVisible,
        isSongPlaying,
        setIsSongPlaying
    } = useContext(playerContext);

    // console.log(currSong)
    const firstUpdate = useRef(true);
    const playCount = async () => {
        try {
            const updatedb = await unauthenticatedPostRequest(`/track/inc/plays/${currSong._id}`);
        } catch (error) {
            console.log(error);
        }
    }

    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        if (!currSong) {
            return;
        }
        // console.log("inc play count");
        changeSong(currSong.url);
        playCount();


    }, [currSong && currSong.url]);

    const playSound = () => {
        if (!soundPlayed) {
            return;
        }
        soundPlayed.play();
        // console.log("playing");
        setIsSongPlaying(true);
    };

    const changeSong = (songSrc) => {
        if (soundPlayed) {
            soundPlayed.stop();
        }
        let sound = new Howl({
            src: [songSrc],
            html5: true,
        });
        setSoundPlayed(sound);
        // console.log("sound changed", sound);
        sound.play();
        setIsPaused(false);
        setIsSongPlaying(true);
    };

    const pauseSound = () => {
        soundPlayed.pause();
        setIsSongPlaying(false);
    };

    const togglePlayPause = () => {
        if (isPaused) {
            playSound();
            setIsPaused(false);
        } else {
            pauseSound();
            setIsPaused(true);
        }
    };

    const handleClosePlayer = () => {
        setIsPlayerVisible(false);
    };

    const handleOpenPlayer = () => {
        if (isSongPlaying) {
            setIsPlayerVisible(true);
        }
    };



    return (
        <>
            <Header />

            <div className="bg-app-color">{children}</div>

            {/* Floating player */}
            {currSong && isPlayerVisible && (


                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-700 p-4 rounded-lg shadow-md w-full max-w-2xl flex items-center z-50">
                    <button
                        className="absolute top-1 right-1 bg-gray-700 rounded text-white hover:text-gray-400 transition duration-300 ease-in-out"
                        onClick={handleClosePlayer}
                    >
                        <Icon icon="charm:cross" className="text-2xl" />
                    </button>

                    <div className="w-20 h-20 bg-gray-600 rounded-lg overflow-hidden">
                        <Link to={`/track/${currSong._id}`}>
                            <img
                                src={currSong.albumArt}
                                alt={currSong.name}
                                className="w-full h-full object-cover hover:opacity-90"
                            />
                        </Link>
                    </div>

                    <div className="flex flex-col flex-grow ml-4">
                        <div className="text-lg text-white font-semibold">
                            <Link to={`/track/${currSong._id}`} className="hover:underline">{currSong.name}</Link>
                        </div>
                        <div className="text-sm font-semibold text-gray-400 flex flex-wrap gap-1">
                            {currSong.artists?.map((artist, index) => (
                                <Link
                                    key={artist._id}
                                    to={`/artist/${artist._id}`}
                                    className="hover:underline"
                                >
                                    {artist.stageName}
                                    {index < currSong.artists.length - 1 && ","}
                                </Link>
                            ))}
                        </div>
                        <div className="text-sm font-extralight text-white flex flex-wrap gap-1">
                            {currSong.genre?.map((g, index) => (
                                <Link
                                    key={g._id || index}
                                    to={`/genre/${g._id}`}
                                    className="hover:underline"
                                >
                                    {g.name}
                                    {index < currSong.genre.length - 1 && ","}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 pr-4">
                        <button className="border rounded-3xl text-white hover:text-gray-400 transition duration-300 ease-in-out text-2xl">
                            <Icon icon="f7:backward-end-fill" className="m-1" />
                        </button>
                        <button
                            className="border rounded-3xl text-white hover:text-gray-400 transition duration-300 ease-in-out text-3xl"
                            onClick={togglePlayPause}
                        >
                            {isPaused ? (
                                <Icon icon="mdi:play" className="m-1" />
                            ) : (
                                <Icon icon="mdi:pause" className="m-1" />
                            )}
                        </button>
                        <button className="border rounded-3xl text-white hover:text-gray-400 transition duration-300 ease-in-out text-2xl">
                            <Icon icon="f7:forward-end-fill" className="m-1" />
                        </button>
                    </div>
                </div>



            )}
            {/* Button to open player */}
            {!isPlayerVisible && isSongPlaying && (
                <button
                    className="z-50 fixed bottom-4 right-4 bg-orange-600 p-4 rounded-full shadow-md text-white hover:text-gray-400 transition duration-300 ease-in-out"
                    onClick={handleOpenPlayer}
                >
                    <Icon icon="mdi:play" className="text-2xl" />
                </button>
            )}

            <Footer />
        </>
    );
};

export default Layout;
