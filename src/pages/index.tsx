import React, { useEffect } from 'react';
import { GetStaticProps } from 'next'; // chamar com G maiusculo e para a tipagem
import { api } from '../services/api';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

// SPA - jeito normal
// SSR - atualiza o conteudo sempre no servido, mas e feito toda vez : getServerSideProps
// SSG - assim que uma pessoa acesasr a pagina e gerado um HTML estatico para os demais usuarios e isso economiza em banco, esse HTML e salvo no servidor, e você pode configuar em quanto tempo ele atualiza :getStaticProps

type Episode = {
  id: string;
  title: string;
  members: string;
  published_at: string;
  thumbnail: string;
  description: string;
};

type HomeProps = {
  episodes: Array<Episode>;
};

export default function Home(props: HomeProps) {
  return (
    <React.Fragment>
      <h1>index</h1>
      <p>{new Date(props.episodes[0].published_at).toLocaleDateString}</p>
    </React.Fragment>
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

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  };
};
