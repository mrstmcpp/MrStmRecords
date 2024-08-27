import { createContext }  from "react";

const playerContext = createContext({
    currSong: null,
    setCurrSong: (currentSong) => {},
    soundPlayed: null,
    setSoundPlayed: () => {},
    isPaused: null,
    setIsPaused: () => {},
    isPlayerVisible: true,
    setIsPlayerVisible: () => {},
    isSongPlaying: false,
    setIsSongPlaying: () => {}
});

export default playerContext;