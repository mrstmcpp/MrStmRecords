import {unauthenticatedGETRequest} from "../../utils/ServerHelpers";
export const fetchGenre = async () => {
    const response = await unauthenticatedGETRequest("/genre/genres");
    return response;
}
