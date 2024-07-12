import React, { useState, useEffect } from "react";
import Layout from "../../layouts/Layout";
import { Link, Route, Routes , useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { MyRequests } from "./MyRequests";
import { MyAccount } from "./MyAccount";
import { MyPlaylists } from "./MyPlaylists";
import { MyTracks } from "./MyTracks";
import UploadArea from "./UploadArea";
import { MyAnalytics } from "./Analytics";
import Spinner from "../misc/Spinner";
import { getPageTitle } from "./shared/getTitle";
import {ArtistChange} from "./homepageCards/artistsChange";
import {GenreChange} from "./homepageCards/genreChange"

const WelcomeMessage = () => {
    return (
        <div className="text-center p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Welcome to the Admin Panel</h2>
            <p className="text-lg">Please select an option from the left menu to get started.</p>
        </div>
    );
};

const Admin = () => {
    const [isLoading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        // Simulating loading delay
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 2000); // Simulating 2 seconds of loading time

        return () => clearTimeout(timeout);
    }, []);

    return (
        <Layout>
            <div className="items-center rounded mr-16 ml-16 py-8">
                <div className="text-4xl bg-slate-700 p-4 text-white rounded text-center">{getPageTitle(location.pathname)}</div>

                <div className="flex flex-row justify-stretch">
                    <div className="flex flex-col w-1/5">
                        {/* Sidebar */}
                        <Link to="/admin/upload" className="flex items-center space-x-20 text-xl text-cyan-400 py-4 bg-slate-700 text-center font-semibold hover:bg-slate-800 px-8">
                            <Icon icon="material-symbols-light:upload" />
                            <span>Upload Song</span>
                            
                        </Link>

                        <Link to="/admin/tracks" className="flex items-center space-x-20 text-xl text-cyan-400 py-4 bg-slate-700 text-center font-semibold hover:bg-slate-800 px-8">
                            <Icon icon="material-symbols:library-music-sharp" />
                            <span>My Tracks</span>
                        </Link>

                        <Link to="/admin/playlists" className="flex items-center space-x-20 text-xl text-cyan-400 py-4 bg-slate-700 text-center font-semibold hover:bg-slate-800 px-8">
                            <Icon icon="icon-park-solid:music-list" />
                            <span>My Playlists</span>
                        </Link>

                        <Link to="/admin/analytics" className="flex items-center space-x-20 text-xl text-cyan-400 py-4 bg-slate-700 text-center font-semibold hover:bg-slate-800 px-8">
                            <Icon icon="clarity:analytics-solid" />
                            <span>Analytics</span>
                        </Link>

                        {/* New menu items */}
                        <Link to="/admin/artistCard" className="flex items-center space-x-20 text-xl text-cyan-400 py-4 bg-slate-700 text-center font-semibold hover:bg-slate-800 px-8">
                            <Icon icon="mdi:account-music" />
                            <span>Artist Card</span>
                        </Link>

                        <Link to="/admin/genreCard" className="flex items-center space-x-20 text-xl text-cyan-400 py-4 bg-slate-700 text-center font-semibold hover:bg-slate-800 px-8">
                            <Icon icon="mdi:music-note" />
                            <span>Genre Card</span>
                        </Link>

                        <Link to="/admin/topTracksCard" className="flex items-center space-x-20 text-xl text-cyan-400 py-4 bg-slate-700 text-center font-semibold hover:bg-slate-800 px-8">
                            <Icon icon="mdi:music" />
                            <span>Top Tracks Card</span>
                        </Link>

                        <Link to="/admin/newReleaseCard" className="flex items-center space-x-20 text-xl text-cyan-400 py-4 bg-slate-700 text-center font-semibold hover:bg-slate-800 px-8">
                            <Icon icon="mdi:new-box" />
                            <span>New Release Card</span>
                        </Link>

                        <Link to="/admin/requests" className="flex items-center space-x-20 text-xl text-cyan-400 py-4 bg-slate-700 text-center font-semibold hover:bg-slate-800 px-8">
                            <Icon icon="fluent-mdl2:feedback-request-solid" />
                            <span>Upload Requests</span>
                        </Link>

                        <Link to="/admin/account" className="flex items-center space-x-20 text-xl text-cyan-400 py-4 bg-slate-700 text-center font-semibold hover:bg-slate-800 px-8">
                            <Icon icon="mdi:account" />
                            <span>My Account</span>
                        </Link>

                        
                    </div>

                    <div className="rounded p-4">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-full">
                                <Spinner />
                            </div>
                        ) : (
                            <Routes>
                                <Route path="/" element={<WelcomeMessage />} />
                                <Route path="upload" element={<UploadArea />} />
                                <Route path="tracks" element={<MyTracks />} />
                                <Route path="playlists" element={<MyPlaylists />} />
                                <Route path="requests" element={<MyRequests />} />
                                <Route path="account" element={<MyAccount />} />
                                <Route path="analytics" element={<MyAnalytics />} />
                                <Route path="artistCard" element={<ArtistChange />} />
                                <Route path="genreCard" element={<GenreChange />} />
                                <Route path="topTracksCard" element={<MyAccount />} />
                                <Route path="newReleaseCard" element={<MyAnalytics />} />
                            </Routes>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Admin;
