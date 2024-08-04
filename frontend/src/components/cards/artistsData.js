import { unauthenticatedGETRequest } from "../../utils/ServerHelpers";

export const topArtistsData = async() =>{
    const data = await unauthenticatedGETRequest("/artist/topArtists");
    return data;
}


