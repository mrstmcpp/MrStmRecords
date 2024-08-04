import { useState, useEffect } from "react";
import { authenticatedGETRequest } from "../../utils/ServerHelpers";
import {Cards} from "./comp/cards"

export const MyTracks = () => {
    const [songData, setSongData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await authenticatedGETRequest("/song/mytracks");
                setSongData(response.tracks || []); 

            } catch (error) {
                console.error("Error fetching song data:", error);
                setSongData([]); 
            }
        };
        getData();
    }, []);

    return (
        <div>
            <div className="flex flex-wrap justify-start">
                {songData.length === 0 ? (
                    <p className="text-white">No songs available.</p>
                ) : (
                    songData.map((item) => (
                        <div className="flex p-2">
                            <Cards title={item.title} urlImage={item.albumArt} artist={item.artist.firstName} genre={item.genre} /> 
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
