import React from 'react';
import styles from './MovieItemShimmer.module.css';


const MovieItemShimmer = ({ items }) => {

  //generate array using number

  const ArrayItems = Array.from({ length: items }, (_, i) => i);


  return (
    <div className={styles.Container}>
      {ArrayItems.map((item, index) => (
        <div className={styles.Item}>
          <div className={styles.Images}></div>
        </div>
      ))
      }

    </div>
  )
}

export default MovieItemShimmer;