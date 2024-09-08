import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const Sidebar = () => {
  return (
    <div className="bg-slate-800 border-r border-slate-700">
      <h3 className="text-center text-2xl font-semibold text-white py-6 border-b border-slate-700">Menu</h3>
      <div className="flex flex-col">
        <Link to="/admin/upload" className="flex items-center space-x-4 text-lg text-white py-6 px-6 hover:bg-slate-700 transition duration-300">
          <Icon icon="material-symbols-light:upload" />
          <span>Upload Song</span>
        </Link>
        <Link to="/admin/tracks" className="flex items-center space-x-4 text-lg text-white py-6 px-6 hover:bg-slate-700 transition duration-300">
          <Icon icon="material-symbols:library-music-sharp" />
          <span>My Tracks</span>
        </Link>
        <Link to="/admin/playlists" className="flex items-center space-x-4 text-lg text-white py-6 px-6 hover:bg-slate-700 transition duration-300">
          <Icon icon="icon-park-solid:music-list" />
          <span>My Playlists</span>
        </Link>
        <Link to="/admin/analytics" className="flex items-center space-x-4 text-lg text-white py-6 px-6 hover:bg-slate-700 transition duration-300">
          <Icon icon="clarity:analytics-solid" />
          <span>Analytics</span>
        </Link>
        <Link to="/admin/topTracksCard" className="flex items-center space-x-4 text-lg text-white py-6 px-6 hover:bg-slate-700 transition duration-300">
          <Icon icon="mdi:music" />
          <span>Top Tracks Card</span>
        </Link>
        <Link to="/admin/newReleaseCard" className="flex items-center space-x-4 text-lg text-white py-6 px-6 hover:bg-slate-700 transition duration-300">
          <Icon icon="mdi:new-box" />
          <span>New Release Card</span>
        </Link>
        <Link to="/admin/requests" className="flex items-center space-x-4 text-lg text-white py-6 px-6 hover:bg-slate-700 transition duration-300">
          <Icon icon="fluent-mdl2:feedback-request-solid" />
          <span>Upload Requests</span>
        </Link>
        <Link to="/admin/account" className="flex items-center space-x-4 text-lg text-white py-6 px-6 hover:bg-slate-700 transition duration-300">
          <Icon icon="mdi:account" />
          <span>My Account</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;