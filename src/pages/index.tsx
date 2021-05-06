import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { api } from '../services/api'
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString'

interface Episode{
  id: string;
  title: string;
  thumbnail: string;
  description: string,
  members: string;
  duration: number;
  durationAsString: string;
  publishedAt: string;
  url: string;
}

interface HomeProps{
  episodes: Episode[]
}

export default function Home(props:HomeProps) {
  return(
    <>
      <p>{JSON.stringify(props.episodes)}</p>
    </>
  )
}


export async function getStaticProps() {
  const { data } = await api.get('/episodes', {
    params: {
      _limit: 12,
      _sort: "published_at",
      order: "desc"
    }
  })
  
  const episodes = data.map((episode: any) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url,
    }
  })

  return {
      props: {
          episodes: data,
      },
      revalidate: 60 * 60 * 8,
  }
} 