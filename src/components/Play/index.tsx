import React from 'react';
import styles from './styles.module.scss';

export function Play() {
  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/icon/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>

      <div className={styles.emptyPlayer}>
        <strong>Selecione um podcast para ouvir</strong>
      </div>

      <footer className={styles.empty}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            <div className={styles.emptySlider} />
          </div>
          <span>00:00</span>
        </div>

        <div className={styles.buttons}>
          <button type="button">
            <img src="/icon/shuffle.svg" alt="Embaralhar" />
          </button>
          <button type="button">
            <img src="/icon/play-previous.svg" alt="Tocar anterior" />
          </button>
          <button type="button" className={styles.playButton}>
            <img src="/icon/play.svg" alt="Tocar" />
          </button>
          <button type="button">
            <img src="/icon/play-next.svg" alt="Tocar Próxima" />
          </button>
          <button type="button">
            <img src="/icon/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  );
}
