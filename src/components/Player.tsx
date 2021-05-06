import { Container } from "../styles/PlayerStyle";

export function Player(){
  return(
    <Container>
      <header>
        <img src="./playing.svg" />
        <strong>Tocando agora</strong>
      </header>
      <div className="emptyPlayer">
        <strong>
          Selecione um podcast para ouvir
        </strong>
      </div>
      <footer>
        <div className="progress">
          <span>00:00:00</span>
          <div className="slider">
            <div className="emptySlider"></div>
          </div>
          <span>00:00:00</span>
        </div>
        <div className="buttons">
          <button disabled>
            <img src="./shuffle.svg" />
          </button>
          
          <button disabled>
            <img src="./play-previous.svg" />
          </button>
          
          <button className="playButton" disabled>
            <img src="./play.svg" />
          </button>
          
          <button disabled>
            <img src="./play-next.svg" />
          </button>
          
          <button disabled>
            <img src="./repeat.svg" />
          </button>
        </div>
      </footer>

    </Container>
  )
}