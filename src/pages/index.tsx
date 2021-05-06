import { format, parseISO } from 'date-fns'
import Image from 'next/image'
import { ptBR } from 'date-fns/locale'
import { api } from '../services/api'
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString'
import { Homepage } from '../styles/indexStyle'

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
  allEpisodes: Episode[]
  latestEpisodes: Episode[]
}

export default function Home({allEpisodes, latestEpisodes}:HomeProps) {
  return(
    <>
      <Homepage>
        <section className="latestEpisodes">
          <h2>Ultímos lançamentos</h2>
          <ul>
            {
              latestEpisodes.map(episode => {
                return(
                  <li key={episode.id}>
                    <Image
                      width={192}
                      height={192} 
                      src={episode.thumbnail}
                      alt={episode.title}
                      objectFit="cover"
                    />

                    <div className="details">
                      <a href={`/episodes/${episode.id}`}>{episode.title}</a>
                      <p>{episode.members}</p>
                      <span>{episode.publishedAt}</span>
                      <span>{episode.durationAsString}</span>
                    </div>

                    <button type="button">
                      <img src="./play-green.svg" alt="Tocar episodio" />
                    </button>
                  </li>
                )
              })
            }
          </ul>
        </section>
        <section className="allEpisodes">
            <h2>Todos os episodios</h2>
            <table cellSpacing={0}>
              <thead>
                <th></th>
                <th>Podcast</th>
                <th>Integrantes</th>
                <th>Data</th>
                <th>Duração</th>
                <th></th>
              </thead>
              <tbody>
                {
                  allEpisodes.map(episode => {
                    return(
                      <tr key={episode.id}>
                        <td style={{ width: '72px' }}>
                          <Image 
                            height={120}
                            width={120}
                            src={episode.thumbnail}
                            alt={episode.title}
                            objectFit="cover"
                          />
                        </td>
                        <td>
                          <a href={`/episodes/${episode.id}`}>{episode.title}</a>
                        </td>
                        <td>{episode.members}</td>
                        <td style={{ width: '100px' }}>{episode.publishedAt}</td>
                        <td>{episode.durationAsString}</td>
                        <td>
                          <button type="button">
                            <img 
                              src="./play-green.svg"
                              alt="Tocar episodio"
                            />
                          </button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
        </section>
      </Homepage>
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
          latestEpisodes: episodes.slice(0, 2),
          allEpisodes: episodes.slice(2, episodes.length),
      },
      revalidate: 60 * 60 * 8,
  }
} 