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

export const unauthenticatedGetRequest = async(route , body) => {
    const response = await fetch(backendURL + route , {
        method: "GET", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })

    const formattedResponse = await response.json();
    return formattedResponse;

    
}

