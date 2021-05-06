import { Container } from "../styles/HeaderStyle";
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'


export function Header(){
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR,
  })

  return(
    <Container>
      <img src="./logo.svg" />
      <p>O melhor para você ouvir sempre</p>
      <span>{currentDate}</span>
    </Container>
  )
}