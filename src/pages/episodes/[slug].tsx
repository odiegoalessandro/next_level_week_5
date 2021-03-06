import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';
import { api } from '../../services/api';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';
import { Container } from '../../styles/EpisodesStyle'
import { Context } from 'node:vm';
import { Head } from '../../services/Head'
import { usePlayer } from '../../contexts/PlayerContext';

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

type EpisodeProps = {
  episode: Episode
}

export default function Episode({ episode }:EpisodeProps){
  const { play } = usePlayer()

  return(
    <>
      <Head>
        <title>{`Podcastr | ${episode.title}`}</title>
      </Head>
      <Container>
          <div className="thumbnailContainer">
            <Link href="/">
              <button>
                <img src="/arrow-left.svg" alt="Voltar"/>
              </button>
            </Link>

            <Image 
              width={700}
              height={160}
              src={episode.thumbnail}
              objectFit="cover"
            />
            <button type="button" onClick={() => play(episode)}>
              <img src="/play.svg" alt="Tocar episódio"/>
            </button>
          </div>

          <header>
            <h1>{episode.title}</h1>
            <span>{episode.members}</span>
            <span>{episode.publishedAt}</span>
            <span>{episode.durationAsString}</span>
          </header>

          <div className="description" dangerouslySetInnerHTML={{__html: episode.description }} />
        </Container>
      </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('/episodes', {
    params: {
      _limit: 2,
      _sort: 'published_at',
      _order: 'desc'
    }
  })
  
  const paths = data.map((episode: Episode) => {
    return {
      params: {
        slug: episode.id
      }
    }
  })

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (ctx: Context) => {
  const { slug } = ctx.params;
  const { data } = await api.get(`/episodes/${slug}`)

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    description: data.description,
    url: data.file.url,
  };

  return {
    props: {
      episode,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
} 