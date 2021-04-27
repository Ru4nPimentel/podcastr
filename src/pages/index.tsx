import { GetStaticProps } from 'next'; // chamar com G maiusculo e para a tipagem
import Image from 'next/image';
import Link from 'next/link';
import { api } from '../services/api';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import converDurationToTimeString from '../utils/converDurationToTimeString';

import styles from './home.module.scss';

// SPA - jeito normal
// SSR - atualiza o conteudo sempre no servido, mas e feito toda vez : getServerSideProps
// SSG - assim que uma pessoa acesasr a pagina e gerado um HTML estatico para os demais usuarios e isso economiza em banco, esse HTML e salvo no servidor, e você pode configuar em quanto tempo ele atualiza :getStaticProps

type Episode = {
  id: string;
  title: string;
  members: string;
  publishedAt: string;
  thumbnail: string;
  duration: number;
  durationAsString: string;
  url: string;
};

type HomeProps = {
  latestEpisodes: Array<Episode>;
  allEpisodes: Array<Episode>;
};

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>

        <ul>
          {latestEpisodes.map((episode) => {
            return (
              <li key={episode.id}>
                <Image
                  width={192}
                  height={192}
                  src={episode.thumbnail}
                  alt={episode.title}
                  objectFit="cover"
                />

                <div className={styles.episodeDetails}>
                  <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>

                <button type="button">
                  <img src="/icon/play-green.svg" alt="Tocar episódio" />
                </button>
              </li>
            );
          })}
        </ul>
      </section>
      <section className={styles.allEpisodes}>
        <h2>Todos episódios</h2>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map((ep) => {
              return (
                <tr key={ep.id}>
                  <td style={{ width: 72 }}>
                    <Image
                      width={120}
                      height={120}
                      src={ep.thumbnail}
                      alt={ep.title}
                      objectFit="cover"
                    />
                  </td>
                  <td>
                    <Link href={`/episodes/${ep.id}`}>
                      <a>{ep.title}</a>
                    </Link>
                  </td>
                  <td>{ep.members}</td>
                  <td style={{ width: 100 }}>{ep.publishedAt}</td>
                  <td>{ep.durationAsString}</td>
                  <td>
                    <button type="button">
                      <img src="/icon/play-green.svg" alt="Tocar episódio" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    },
  });

  const episodes = data.map((ep) => {
    return {
      id: ep.id,
      title: ep.title,
      members: ep.members,
      publishedAt: format(parseISO(ep.published_at), 'd MMM yy', {
        locale: ptBR,
      }),
      thumbnail: ep.thumbnail,
      duration: Number(ep.file.duration),
      durationAsString: converDurationToTimeString(Number(ep.file.duration)),
      url: ep.file.url,
    };
  });

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8,
  };
};
