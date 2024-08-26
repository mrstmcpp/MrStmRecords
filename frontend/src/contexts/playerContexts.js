import { createContext }  from "react";

const playerContext = createContext({
    currSong : null,
    setCurrSong : (currSong) =>{
        
    }
});

export default playerContext;