import { unauthenticatedGETRequest } from "../../utils/ServerHelpers";

export const topTracksData = async () => {
    try {
        const tracksfromApi = await unauthenticatedGETRequest("/song/getallsongs");
        return tracksfromApi;

    } catch (error) {
        console.log(error);
    }
}
