import React, { useState } from "react";
import "../player/player.css";
import Layout from "../../layouts/Layout";
import { Icon } from '@iconify/react';
import {Howl, Howler} from 'howler';

export const FloatingPlayer = () => {
    const [soundPlayed , setsoundPlayed] = useState(null);
    const [isPaused, setIsPaused] = useState(true);

    const playSong = (source) => {
        if(soundPlayed){
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
        if(isPaused){
            playSong("https://res.cloudinary.com/dtur9xepq/video/upload/v1754469893/Happy_Mpp3_gr3qfq.mp3");
        }else{
            pauseSong();
        }
    }
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center p-12">
                <div className="text-3xl text-white font-bold items-center mb-4">
                    Player Testing Page
                </div>

                <div className="flex items-center bg-gray-800 p-4 rounded-lg shadow-md w-full max-w-2xl">

                    <div className="w-20 h-20 bg-gray-600 rounded-lg overflow-hidden">
                        <img
                            src="https://res.cloudinary.com/dtur9xepq/image/upload/v1720716726/mc3cnjt2sgb1rubjrdqv.png"
                            alt="Album Art"
                            className="w-full h-full object-cover"
                        />
                    </div>


                    <div className="flex flex-col flex-grow ml-4">
                        <div className="text-lg text-white font-semibold">
                            Better Off Alone
                        </div>
                        <div className="text-sm text-gray-400">Mr Stm</div>
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
            </div>
        </Layout>
    );
};
