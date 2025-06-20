import { unauthenticatedGETRequest } from "../../utils/ServerHelpers";

export const topTracksData = async () => {
    try {
        const tracksfromApi = await unauthenticatedGETRequest("/track");
        return tracksfromApi;

    } catch (error) {
        console.log(error);
    }
}
