import Image from 'next/image'
import { useEffect, useRef, useState } from "react";
import { usePlayer } from "../contexts/PlayerContext";
import { Container } from "../styles/PlayerStyle";
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';

export function Player(){
  const { 
    episodeList, 
    currentEpisodeIndex, 
    isPlaying,
    togglePlay, 
    setPlayingState,
    playNext,
    playPrevious,
    hasPrevious,
    hasNext,
    isLooping,
    toogleLoop,
    toogleShuffle,
    isShuffling
  } = usePlayer()

  const episode = episodeList[currentEpisodeIndex]
  const audioRef = useRef<HTMLAudioElement>(null)
  const [progress, setProgress] = useState(0)

  function setupProgressListener(){
    if(!audioRef.current){
      return
    }
    
    audioRef.current.currentTime = 0
    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime))
    })
  }

  function handleSeek(amount: number){
    audioRef.current.currentTime = amount
    setProgress(amount)
  }

  useEffect(() => {
    if(!audioRef.current) {
      return;
    }

    if(isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying])


  return(
    <Container>
      <header>
        <img src="/playing.svg" />
        <strong>Tocando agora {episode?.title}</strong>
      </header>
      { episode ? (
        <div className="currentEpisode">
          <Image
            width={592}
            height={592} 
            src={episode.thumbnail}
            objectFit="cover"

          />
          <span>{episode.title}</span>
          <p>{episode.members}</p>
        </div>
      ) : (
        <div className="emptyPlayer">
          <strong>
            Selecione um podcast para ouvir
          </strong>
        </div>
      )}
      <footer className={!episode ? 'empty' : 'progress'}>
        <div className="progress">
        <span>{convertDurationToTimeString(progress)}</span>
          <div className="sliderBar">
          { episode ? (
              <Slider
                max={episode.duration}
                value={progress}
                onChange={handleSeek}
                trackStyle={{ backgroundColor: '#04d361' }}
                railStyle={{ backgroundColor: '#9f75ff'}}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4}}
              />
            ) : (
              <div className='emptySlider' />
            ) 
          }
          </div>
          <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
        </div>

        { episode && (
          <audio
            src={episode.url}
            ref={audioRef}
            loop={isLooping}
            autoPlay
            onLoadedMetadata={setupProgressListener}
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
          />
        )}

        <div className="buttons">
          <button
            disabled={!episode || episodeList.length === 1}
            onClick={toogleShuffle}
            className={isShuffling ? 'isActive' : 'isDisabled'}
          >
            <img src="/shuffle.svg" />
          </button>
          
          <button
            disabled={!episode}
            onClick={playPrevious}
          >
            <img src="/play-previous.svg" />
          </button>
          
          <button className="playButton"
            disabled={!episode}
            onClick={togglePlay}
          >
            { isPlaying
              ?(
                <img src="/pause.svg" />
              )
              :(
                <img src="/play.svg" />
              )
            }
          </button>
          
          <button 
            disabled={!episode}
            onClick={playNext}
          >
            <img src="/play-next.svg" />
          </button>
          
          <button 
            disabled={!episode} 
            onClick={toogleLoop}
            className={isLooping ? 'isActive' : 'isDisabled'}
          >
            <img src="/repeat.svg" />
          </button>
        </div>
      </footer>

    </Container>
  )
}