import React, { useState } from 'react';
import { topArtistsData } from '../../cards/artistsData';

export const ArtistChange = () => {
    const [artists, setArtists] = useState(topArtistsData);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (index, field, value) => {
        const newArtists = [...artists];
        newArtists[index][field] = value;
        setArtists(newArtists);
    };

    const handleSubmit = () => {
        setSuccessMessage('Data saved successfully!');
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    };

    const renderArtists = () => {
        return artists.map((artist, index) => (
            <div key={index} className="py-2">
                <div className="flex flex-wrap border p-4 rounded-lg shadow-lg">
                    <div className="">
                        <img src={artist.urlImage} alt={artist.artist} className="object-cover w-40 h-40 rounded-md" />
                    </div>
                    <div className="flex flex-col justify-center items-start px-8 space-y-4">
                        <label className="flex flex-col text-gray-700 font-medium">
                            <p className="text-white">Artist:</p>
                            <input
                                type="text"
                                value={artist.artist}
                                onChange={(e) => handleChange(index, 'artist', e.target.value)}
                                className="rounded-full p-2 mt-1 border border-gray-300 w-80"
                            />
                        </label>
                        <label className="flex flex-col text-gray-700 font-medium">
                            <p className="text-white">Artist:</p>
                            <input
                                type="text"
                                value={artist.url}
                                onChange={(e) => handleChange(index, 'url', e.target.value)}
                                className="rounded-full p-2 mt-1 border border-gray-300 w-80"
                            />
                        </label>
                        <label className="flex flex-col text-gray-700 font-medium">
                            <p className="text-white">Image URL:</p>
                            <input
                                type="text"
                                value={artist.urlImage}
                                onChange={(e) => handleChange(index, 'urlImage', e.target.value)}
                                className="rounded-full p-2 mt-1 border border-gray-300 w-80"
                            />
                        </label>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div className="">
            {renderArtists()}
            <div className="flex justify-center mt-8">
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white rounded-full px-6 py-2 hover:bg-blue-600"
                >
                    Submit
                </button>
            </div>
            {successMessage && (
                <div className="flex justify-center mt-4">
                    <p className="text-green-500 font-semibold">{successMessage}</p>
                </div>
            )}
        </div>
    );
};

export default ArtistChange;
