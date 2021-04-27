import format from 'date-fns/format';
import { ptBR } from 'date-fns/locale';
import parseISO from 'date-fns/parseISO';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import converDurationToTimeString from '../../utils/converDurationToTimeString';

import styles from './episode.module.scss';

//dentro da pasta episode, dentro do [] e o nome do parametro que eu vou utilizar, pode ser qualquer um, o next indentifica a pasta como uma pagina

type Episode = {
  id: string;
  title: string;
  members: string;
  publishedAt: string;
  thumbnail: string;
  duration: number;
  durationAsString: string;
  description: string;
  url: string;
};

type EpisodeProps = {
  episode: Episode;
};

const episode = ({ episode }: EpisodeProps) => {
  const route = useRouter();

  return (
    <div className={styles.episode}>
      <div className={styles.thumbnailContainer}>
        <Link href="/">
          <button type="button">
            <img src="/icon/arrow-left.svg" alt="Voltar" />
          </button>
        </Link>

        <Image
          width={700}
          height={160}
          src={episode.thumbnail}
          objectFit="cover"
        />
        <button type="button">
          <img src="/icon/play.svg" alt="Tocar episódio" />
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;
  const { data } = await api.get(`/episodes/${slug}`);

  const episode = {
    id: data.id,
    title: data.title,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', {
      locale: ptBR,
    }),
    thumbnail: data.thumbnail,
    description: data.description,
    duration: Number(data.file.duration),
    durationAsString: converDurationToTimeString(Number(data.file.duration)),
    url: data.file.url,
  };

  return {
    props: { episode },
    revalidate: 60 * 60 * 24, //24 horas
  };
};

export default episode;
