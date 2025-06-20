import { unauthenticatedGETRequest } from "../../utils/ServerHelpers";

export const topArtistsData = async () => {
    try {
        const data = await unauthenticatedGETRequest("/artist");
        return data;
    } catch (error) {
        console.log(error);
    }

}


