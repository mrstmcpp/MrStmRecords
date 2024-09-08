import React from "react";

export const Cards = ({ title, urlImage, artist, genre }) => {
    const maxLength = 20;
    const truncatedTitle = title.length > maxLength ? title.substring(0, maxLength) + "..." : title;
    const truncatedGenre = genre.length > maxLength ? genre.substring(0, maxLength) + "..." : genre;
    const truncatedArtist = artist.length > maxLength ? artist.substring(0, maxLength) + "..." : artist;

    return (
        <div className="bg-slate-800 rounded flex flex-row justify-items-start">
            <div className="flex flex-col justify-end items-center">
                <div className="p-4">
                    <img src={urlImage} alt={title} className="w-44 h-44 object-cover" />
                </div>
                <div className="flex justify-center items-center flex-col px-4">
                    <div className="font-bold text-white text-center truncate">
                        {truncatedTitle}
                    </div>
                    <p className="font-normal text-white text-center">
                        {truncatedArtist || "Not available"}
                    </p>
                    <p className="text-rev-color font-thin m-1">
                        {truncatedGenre || "Not Available"}
                    </p>
                </div>
            </div>
        </div>
    );
};
