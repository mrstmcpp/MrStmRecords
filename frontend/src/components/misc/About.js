import React from "react";
import Layout from "../../layouts/Layout";

const About = () => {
    return (
        <Layout>
            <div className="bg-app-color min-h-screen flex flex-col items-center justify-center p-4">
                <div className="max-w-3xl bg-gray-800 shadow-lg rounded-lg p-8">
                    <h1 className="text-3xl font-bold text-rev-color mb-4 text-center">About Mr Stm</h1>
                    <img 
                        src="https://yt3.googleusercontent.com/0HodD7CaOyiYjTrGqE8aC4Q2O74pubaaZ4tf6PPOLfHOINEejAfap9BAwIGKGkEI2zd4erFNzQ=s900-c-k-c0x00ffffff-no-rj" 
                        alt="Mr Stm" 
                        className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-orange-400 border-gradient-to-r from-orange-500 to-yellow-500 shadow-lg"
                    />
                    <p className="text-rev-color mb-4">
                        Your gateway to a world of electrifying EDM creations! Get ready to dive into a universe of original compositions and remixes that will ignite your senses and leave you craving for more.
                    </p>
                    <p className="text-rev-color mb-4">
                        Mr Stm crafts his own unique soundscapes, blending pulsating beats, infectious melodies, and a touch of magic into every track. Immerse yourself in a symphony of sonic bliss as you journey through genres like progressive house, future bass, trance, and more.
                    </p>
                    <p className="text-rev-color mb-4">
                        But the excitement doesn't end there! Mr Stm also showcases his exceptional remixing skills by transforming famous songs into electrifying EDM masterpieces. Witness the transformation as beloved melodies are infused with a fresh new twist, breathing new life into familiar tunes. His remixes are a testament to his ability to seamlessly merge the old with the new, creating a sonic experience that will make you move and groove.
                    </p>
                    <p className="text-rev-color font-bold">
                        Get ready to unleash your inner EDM enthusiast with Mr Stm!
                    </p>
                    <p className="text-rev-color font-bold mt-4">
                        EDM is lob (Gulabi Dil).
                    </p>
                    <div className="flex justify-center mt-6">
                        <a href="https://soundcloud.com/mrstmmusic" target="_blank" rel="noopener noreferrer" className="mx-2 text-rev-color hover:text-orange-500">
                            <i className="fab fa-soundcloud fa-2x"></i>
                        </a>
                        <a href="https://instagram.com/mrstmmusic" target="_blank" rel="noopener noreferrer" className="mx-2 text-rev-color hover:text-orange-500">
                            <i className="fab fa-instagram fa-2x"></i>
                        </a>
                        <a href="https://youtube.com/@mrstmmusic" target="_blank" rel="noopener noreferrer" className="mx-2 text-rev-color hover:text-orange-500">
                            <i className="fab fa-youtube fa-2x"></i>
                        </a>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default About;
