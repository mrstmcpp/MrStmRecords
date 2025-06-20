import {unauthenticatedGETRequest , authenticatedPUTRequest} from "../../utils/ServerHelpers";
export const fetchGenres = async () => {
    try {
        const response = await unauthenticatedGETRequest("/genre");
        return response;
    } catch (error) {
        console.error("Failed to fetch genres:", error);
        throw error;
    }
};


export const fetchPlaylists = async () => {
    try {
        const response = await unauthenticatedGETRequest("/playlist");
        return response;
    } catch (error) {
        console.error("Failed to fetch playlists:", error);
        throw error;
    }
};

export const updateGenre = async ({ genreId, body }) => {
    try {
        const response = await authenticatedPUTRequest(`/genre/updateGenre/${genreId}`, body);
        return response?.data;
    } catch (error) {
        console.error(`Failed to update genre with ID ${genreId}:`, error);
        throw error;
    }
};


