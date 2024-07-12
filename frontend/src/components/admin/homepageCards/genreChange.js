import React, { useState } from 'react';
import {fetchGenre} from '../../cards/genreData';

export const GenreChange = () => {
    const [genres, setGenres] = useState(fetchGenre);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (index, field, value) => {
        const newGenres = [...genres];
        newGenres[index][field] = value;
        setGenres(newGenres);
    };

    const handleSubmit = () => {
        setSuccessMessage('Data saved successfully!');
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    };

    const renderGenres = () => {
        return genres.map((genre, index) => (
            <div key={index} className="my-4">
                <div className="flex flex-row border p-4 rounded-lg shadow-lg">
                    <div className="">
                        <img src={genre.imageUrl} alt={genre.genreName} className="object-cover w-40 h-40 rounded-md" />
                    </div>
                    <div className="flex flex-col justify-center items-start px-8 space-y-4">
                        <label className="flex flex-col text-gray-700 font-medium">
                            <p className="text-white">Genre:</p>
                            <input
                                type="text"
                                value={genre.genreName}
                                onChange={(e) => handleChange(index, 'genreName', e.target.value)}
                                className="rounded-full p-2 mt-1 border border-gray-300 w-80"
                            />
                        </label>
                        <label className="flex flex-col text-gray-700 font-medium">
                            <p className="text-white">Image URL:</p>
                            <input
                                type="text"
                                value={genre.imageUrl}
                                onChange={(e) => handleChange(index, 'imageUrl', e.target.value)}
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
            {renderGenres()}
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

export default GenreChange;
