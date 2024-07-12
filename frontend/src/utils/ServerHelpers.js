import {backendURL} from "./config/backendUrl";
export const unauthenticatedPostRequest = async(route, body) => {
    const response = await fetch(backendURL + route , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    const formattedResponse = await response.json();
    return formattedResponse;
}


export const authenticatedPostRequest = async(route, body) => {
    const token = getToken();
    const response = await fetch(backendURL + route , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(body),
    });

    const formattedResponse = await response.json();
    return formattedResponse;
}


export const authenticatedGETRequest = async (route) => {
    const token = getToken();
    const response = await fetch(backendURL + route, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const formattedResponse = await response.json();
    return formattedResponse;
};

export const unauthenticatedGETRequest = async (route) => {
    try {
        const response = await fetch(backendURL + route, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            console.error(`Failed to fetch ${route}: ${response.status} ${response.statusText}`);
            throw new Error(`Failed to fetch ${route}: ${response.status} ${response.statusText}`);
        }

        const formattedResponse = await response.json();
        return formattedResponse;
    } catch (error) {
        console.error("GET request failed:", error);
        throw error;
    }
};


const getToken = () => {
    const accessToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    return accessToken;
};
