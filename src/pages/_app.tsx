import { GlobalStyle } from '../styles/globalStyle'
import { Wrapper } from '../styles/appStyle'
import { Header } from '../components/Header'
import { Player } from '../components/Player'
import { PlayerContext } from '../contexts/PlayerContext'
import { useState } from 'react'

type Episode = {
  title: string
  duration: number
  thumbnail: string
  members: string
  url: string
}

export default function MyApp({ Component, pageProps }: any) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false)

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true)
  }

  function togglePlay(){
    setIsPlaying(!isPlaying)
  }

  function setPlayingState(state:boolean){
    setPlayingState(state)
  }

  return (
    <>
      <PlayerContext.Provider value={{ 
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        play,
        togglePlay,
        setPlayingState
      }}>
        <Wrapper>
          <main>
            <Header />
            <Component {...pageProps} />
            <GlobalStyle />
          </main>
          <Player />
        </Wrapper>
      </PlayerContext.Provider>
    </>
  )

}