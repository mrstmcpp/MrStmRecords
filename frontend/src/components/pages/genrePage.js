import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../layouts/Layout";
import { unauthenticatedGETRequest } from "../../utils/ServerHelpers";

const GenrePage = () => {
    const { genreId } = useParams();
    const [genreData, setGenreData] = useState([]);

    useEffect(() => {
        const fetchGenreData = async () => {
            try {
                const genreWiseSongs = await unauthenticatedGETRequest(`/genre/id/${genreId}`);
                setGenreData(genreWiseSongs || []);
                console.log(genreWiseSongs);
                
            } catch (error) {
                console.error("Error fetching genre data:", error);
            }
        };

        if (genreId) {
            fetchGenreData();
        }
    }, [genreId]);

    return (
        <Layout>
            <h2>Welcome</h2>
        </Layout>
    );
}

export default GenrePage;
