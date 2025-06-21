import React from "react";
import Layout from "../../layouts/Layout";
import { Icon } from "@iconify/react";

const About = () => {
    const mrstmImageUrl = "/mrstm.jpg";
    return (
        <Layout>
                <div
                    className="background-release-image"
                    style={{ backgroundImage: `url(${mrstmImageUrl})` }}
                ></div>
            <div className="relative min-h-screen flex flex-col items-center justify-center p-4 content-release-box">

                <div className="max-w-3xl bg-gray-800 shadow-lg rounded-lg p-8">
                    <h1 className="text-3xl font-bold text-white mb-4 text-center">About Mr Stm</h1>
                    <img
                        src="/mrstm.jpg"
                        alt="Mr Stm"
                        className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-orange-400 border-gradient-to-r from-orange-500 to-yellow-500 shadow-lg"
                    />
                    <div className="flex justify-center mb-6">
                        <a href="https://github.com/mrstmcpp" target="_blank" rel="noopener noreferrer" className="mx-2 text-rev-color hover:text-white">
                            <Icon icon="mdi:github" className="text-2xl" />
                        </a>

                        <a href="https://soundcloud.com/mrstmmusic" target="_blank" rel="noopener noreferrer" className="mx-2 text-rev-color hover:text-orange-500">
                            <Icon icon="mdi:soundcloud" className="text-2xl" />
                        </a>
                        <a href="https://instagram.com/mrstmmusic" target="_blank" rel="noopener noreferrer" className="mx-2 text-rev-color hover:text-purple-500">
                            <Icon icon="mdi:instagram" className="text-2xl" />
                        </a>
                        <a href="https://youtube.com/@mrstm_music" target="_blank" rel="noopener noreferrer" className="mx-2 text-rev-color hover:text-red-500">
                            <Icon icon="mdi:youtube" className="text-2xl" />
                        </a>

                    </div>

                    <p className="text-white mb-4">
                        Your gateway to a world of electrifying EDM creations! Get ready to dive into a universe of original compositions and remixes that will ignite your senses and leave you craving for more.
                    </p>
                    <p className="text-white mb-4">
                        Mr Stm crafts his own unique soundscapes, blending pulsating beats, infectious melodies, and a touch of magic into every track. Immerse yourself in a symphony of sonic bliss as you journey through genres like progressive house, future bass, trance, and more.
                    </p>
                    <p className="text-white mb-4">
                        Beyond music, Mr Stm is also a passionate full-stack developer with a knack for building robust and scalable web applications. Proficient in technologies like React, Node.js, MongoDB, and Spring Boot, he merges creativity with clean, performant code. Whether crafting intuitive frontends or designing efficient backend systems, Mr Stm brings precision and originality to every project. His recent work includes real-time apps, music platforms, and API-driven services—all infused with a love for tech and user experience.
                    </p>

                    <p className="text-white font-bold">
                        Get ready to unleash your inner EDM enthusiast with Mr Stm!
                    </p>
                    <p className="text-white font-bold mt-4">
                        EDM is lob (Gulabi Dil).
                    </p>
                </div>
            </div>
        </Layout>
    );
}

export default About;
