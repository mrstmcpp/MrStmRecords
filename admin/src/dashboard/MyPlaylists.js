import { useState, useEffect } from "react";
import { authenticatedGETRequest } from "../utils/ServerHelpers";
import {Cards} from "./comp/cards"

export const MyPlaylists = () => {
    const [songData, setSongData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await authenticatedGETRequest("/playlist/myplaylists");
                setSongData(response.playlists || []);

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
                    <p className="text-white">No Playlists available.</p>
                ) : (
                    songData.map((item) => (
                        <div className="flex p-2">
                            <Cards title={item.name} urlImage={item.artwork} artist={item.owner.firstName} genre={item.description} /> 
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
