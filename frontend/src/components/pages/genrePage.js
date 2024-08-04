import React, { useEffect , useState } from "react";
import Layout from "../../layouts/Layout";
import {unauthenticatedGETRequest} from "../../utils/ServerHelpers";


const GenrePage = async({playlistId}) => {
    const [genreData, setGenreData] = useState([]);

    useEffect(() => {
        const fetchGenreData = async () => {
            try {
                const genreWiseSongs = await unauthenticatedGETRequest(`/playlist/id/${playlistId}`);
                setGenreData(genreWiseSongs || []);
                console.log(genreWiseSongs);
            } catch (error) {
                console.error("Error fetching genre data:", error);
            }
        };

        fetchGenreData();
    }, [playlistId]);


    
    return (
        <Layout>
            <h2>Welcome</h2>
        </Layout>
    )
}

export default GenrePage;