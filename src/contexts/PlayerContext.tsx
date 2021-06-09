import React, { createContext, ReactNode } from 'react';

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Array<Episode>;
  currentEpisode: number;
  isPlaying: boolean;
  hasPrevious: boolean;
  hasNext: boolean;
  play: (episode: Episode) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
  playList: (list: Episode[], index: number) => void;
  setPlayingState: (state: boolean) => void;
};

type PlayerContextProviderProps = {
  children: ReactNode;
};

export const PlayerContext = createContext({} as PlayerContextData);

export const PlayerContextProvider = ({
  children,
}: PlayerContextProviderProps) => {
  const [episodeList, setEpisodeList] = React.useState([]);
  const [currentEpisode, setCurrentEpisode] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const hasPrevious = currentEpisode > 0;
  const hasNext = currentEpisode + 1 < episodeList.length;

  function play(episode) {
    setEpisodeList([episode]);
    setCurrentEpisode(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisode(index);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function playNext() {
    if (hasNext) {
      setCurrentEpisode(currentEpisode + 1);
    }
  }

  function playPrevious() {
    if (hasPrevious) {
      setCurrentEpisode(currentEpisode - 1);
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisode,
        play,
        isPlaying,
        togglePlay,
        setPlayingState,
        playList,
        playNext,
        playPrevious,
        hasPrevious,
        hasNext,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
