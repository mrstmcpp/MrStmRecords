import React, { useState, useEffect } from "react";
import { useLocation, Routes, Route, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { getPageTitle } from "./shared/getTitle";
import { MyRequests } from "./MyRequests";
import { MyAccount } from "./MyAccount";
import { MyPlaylists } from "./MyPlaylists";
import { MyTracks } from "./MyTracks";
import UploadArea from "./UploadArea";
import { MyAnalytics } from "./Analytics";
import Spinner from "../misc/Spinner";
import Layout from "../layouts/Layout";

const WelcomeMessage = () => {
  return (
    <div className="text-center p-8 text-white">
      <h2 className="text-3xl font-bold mb-4">Welcome to the Admin Panel</h2>
      <p className="text-lg">Please select an option from the left menu to get started.</p>
    </div>
  );
};

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const location = useLocation();
  const [cookie] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = cookie.token;

    if (!token) {
      navigate("/login");
    }

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Layout>
      <div className="flex-1 bg-slate-800 h-full">
        <div className="text-center text-2xl font-semibold text-white py-6 border-b border-slate-700">{getPageTitle(location.pathname)}</div>

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
            <Route path="topTracksCard" element={<MyAccount />} />
            <Route path="newReleaseCard" element={<MyAnalytics />} />
          </Routes>
        )}
      </div>
    </Layout>
  );
}

export default Dashboard;