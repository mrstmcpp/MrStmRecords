import React from "react";
import AudioPlayer from 'react-h5-audio-player';
import Layout from "../../layouts/Layout";
import '../player/player.css';


const FloatingPlayer = () => {

    return (
        <Layout>
            <div className="w-full h-full">
                <AudioPlayer
                    autoPlay
                    src="https://res.cloudinary.com/dtur9xepq/video/upload/v1721485372/j3rnbxy61lkqu2bvexa4.mp3"
                    showJumpControls
                    showFilledProgress={true}
                    onPlay={e => console.log("onPlay")}
                    className="font-bold"
                />
            </div>
        </Layout>

    )

}


export default FloatingPlayer;