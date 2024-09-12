import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../layouts/Layout";
import { unauthenticatedGETRequest } from "../../utils/ServerHelpers";
import { toast } from "react-toastify";

const GenrePage = () => {
    const { genreId } = useParams();
    const [genreData, setGenreData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGenreData = async () => {
            try {
                const genreWiseSongs = await unauthenticatedGETRequest(`/genre/id/${genreId}`);
                setGenreData(genreWiseSongs || []);
            } catch (error) {
                console.error("Error fetching genre data:", error);
            }
        };

        if (genreId) {
            fetchGenreData();
        }

        // Show the under construction message
        toast.error("This page is under construction...");
        setTimeout(() => {
            navigate("/");
        }, 3000);
    }, [genreId , navigate]);

    return (
        <Layout>
            <h2>This page is under construction...</h2>
        </Layout>
    );
}

export default GenrePage;
