import React from 'react';
import styles from './MovieItemShimmer.module.css';


const MovieItemShimmer = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.Item}>
        <div className={styles.Images}>hello</div>
      </div>
      <div className={styles.Item}>
        <div className={styles.Images}></div>
      </div>

      <div className={styles.Item}>
        <div className={styles.Images}></div>
      </div>

      <div className={styles.Item}>
        <div className={styles.Images}></div>
      </div>

      <div className={styles.Item}>
        <div className={styles.Images}></div>
      </div>

      <div className={styles.Item}>
        <div className={styles.Images}></div>
      </div>
    </div>
  )
}

export default MovieItemShimmer;