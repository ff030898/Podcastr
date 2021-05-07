import { createContext, ReactNode, useContext, useState } from 'react';

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}
type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    setPlayingState: (state: boolean) => void;
    playNext: () => void;
    playPrevious: () => void;
    isLooping: boolean;
    toogleLooping: () => void;
    tooglePlay: () => void;
    isSuffling: boolean;
    toogleSuffle: () => void;
    hasPrevious: boolean;
    hasNext: boolean;
    clearPlayingState: () => void;

}

type PlayerContextProviderProps = {
    children: ReactNode;
}

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isSuffling, setIsSuffling] = useState(false);

    function play(episode: Episode) {
        setEpisodeList([episode]);
        setCurrentEpisodeIndex(0);
        setIsPlaying(true);
    }

    function playList(list: Episode[], index: number) {
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }

    function tooglePlay() {
        setIsPlaying(!isPlaying);
    }

    function toogleLooping() {
        setIsLooping(!isLooping);
    }

    function toogleSuffle() {
       setIsSuffling(!isSuffling);
    }


    function setPlayingState(state: boolean) {
        setIsPlaying(state);
    }

    function clearPlayingState() {
        setEpisodeList([]);
        setCurrentEpisodeIndex(0);
    }


    const hasPrevious = currentEpisodeIndex > 0;
    const nextEpisodeIndex = currentEpisodeIndex + 1;
    const hasNext = isSuffling || nextEpisodeIndex < episodeList.length;

    function playNext() {

        if(isSuffling){
           const randomNextEpisode = Math.floor(Math.random() * episodeList.length);
           setCurrentEpisodeIndex(randomNextEpisode);
        }else if (hasNext) {
            setCurrentEpisodeIndex(nextEpisodeIndex);
        }
    }

    function playPrevious() {
        if (hasPrevious) {
            setCurrentEpisodeIndex(currentEpisodeIndex - 1);
        }
    }

    return (
        <PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, isPlaying, play, playList, setPlayingState, playNext, playPrevious, isLooping, toogleLooping, isSuffling, toogleSuffle, clearPlayingState, tooglePlay, hasPrevious, hasNext }}>
            { children}
        </PlayerContext.Provider>
    )

}

export const usePlayer = () => {
  return useContext(PlayerContext);
}

