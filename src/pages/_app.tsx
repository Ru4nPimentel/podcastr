import { Header } from '../components/Header';
import '../styles/global.scss';
import styles from '../styles/app.module.scss';
import { Play } from '../components/Play';
import { PlayerContextProvider } from '../contexts/PlayerContext';
import React from 'react';

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Play />
      </div>
    </PlayerContextProvider>
  );
}

export default MyApp;
