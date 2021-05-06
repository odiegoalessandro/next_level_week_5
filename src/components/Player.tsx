import Image from 'next/image'
import { useContext, useEffect, useRef } from "react";
import { PlayerContext } from "../contexts/PlayerContext";
import { Container } from "../styles/PlayerStyle";
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

export function Player(){
  const { 
    episodeList, 
    currentEpisodeIndex, 
    isPlaying,
    togglePlay, 
    setPlayingState
  } = useContext(PlayerContext)

  const episode = episodeList[currentEpisodeIndex]

  const audioRef = useRef<HTMLAudioElement>(null)
  
  useEffect(() => {
    if(!audioRef.current){
      return
    }
    if(isPlaying){
      audioRef.current.play()
    }
    else{
      audioRef.current.pause()
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
          <span>00:00:00</span>
          <div className="sliderBar">
          { episode ? (
              <Slider 
                trackStyle={{ backgroundColor: '#04d361' }}
                railStyle={{ backgroundColor: '#9f75ff'}}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4}}
              />
            ) : (
              <div className='emptySlider' />
            ) 
          }
          </div>
          <span>00:00:00</span>
        </div>

        { episode && (
          <audio
            src={episode.url}
            ref={audioRef}            
            autoPlay
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
          />
        )}

        <div className="buttons">
          <button disabled={!episode}>
            <img src="/shuffle.svg" />
          </button>
          
          <button disabled={!episode}>
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
          
          <button disabled={!episode}>
            <img src="/play-next.svg" />
          </button>
          
          <button disabled={!episode}>
            <img src="/repeat.svg" />
          </button>
        </div>
      </footer>

    </Container>
  )
}