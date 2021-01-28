import React from 'react';

import humanBody from '~app/assets/human-body.png';

import { HUMAN_CHAKRAS } from './constants';
import styles from './styles.module.scss';

function Home() {
  return (
    <div className="row full-width full-height center middle">
      <div className={styles.humanBodyContainer}>
        <img className={styles.humanBodyImage} src={humanBody} alt="zerf-icon" />
        {Object.values(HUMAN_CHAKRAS).map(chakra => (
          <span key={chakra} className={`${styles[chakra]}`} />
        ))}
      </div>
    </div>
  );
}

export default Home;
