import {unauthenticatedGETRequest , authenticatedPUTRequest} from "../../utils/ServerHelpers";
export const fetchGenre = async () => {
    const response = await unauthenticatedGETRequest("/genre/genres");
    return response;
}

export const fetchPlaylist = async () => {
    const response = await unauthenticatedGETRequest("/playlist/allPlaylist");
    return response;
}

export const updateGenre = async ({ genreId, body }) => {
    try {
        const response = await authenticatedPUTRequest(`/genre/updateGenre/${genreId}`, body);
        return response;
    } catch (error) {
        console.error("Failed to update genre:", error);
        throw error;
    }
};