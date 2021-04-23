import { Header } from '../components/Header';
import '../styles/global.scss';
import styles from '../styles/app.module.scss';
import { Play } from '../components/Play';

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.wrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Play />
    </div>
  );
}

export default MyApp;
