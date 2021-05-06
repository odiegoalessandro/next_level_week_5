import { GlobalStyle } from '../styles/globalStyle'
import { Wrapper } from '../styles/appStyle'
import { Header } from '../components/Header'
import { Player } from '../components/Player'


export default function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </Wrapper>
    </>
  )

}