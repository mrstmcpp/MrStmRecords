import { unauthenticatedGETRequest } from "../../utils/ServerHelpers";

export const topArtistsData = async () => {
    try {
        const data = await unauthenticatedGETRequest("/artist/topArtists");
        return data;
    } catch (error) {
        console.log(error);
    }

}


