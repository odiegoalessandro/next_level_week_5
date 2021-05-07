import { GlobalStyle } from '../styles/globalStyle'
import { Wrapper } from '../styles/appStyle'
import { Header } from '../components/Header'
import { Player } from '../components/Player'
import { PlayerContextProvider } from '../contexts/PlayerContext'


export default function MyApp({ Component, pageProps }: any) {

  return (
    <PlayerContextProvider>
      <Wrapper>
        <main>
          <Header />
          <Component {...pageProps} />
          <GlobalStyle />
        </main>
        <Player />
      </Wrapper>
    </PlayerContextProvider>
  )

}