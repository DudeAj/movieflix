import React from 'react';
import styles from './moviebasic.module.css';

const moviebasic = (props) => {
    
    return (
        <div>
            <div className={styles.featureContainer}>
                <div className={styles.Heading}><p>Rating:</p></div>
                <div className={styles.Details}>{props.rating}(imdb)</div>
            </div>

            <div className={styles.featureContainer}>
                <div className={styles.Heading}>Genre:</div>
                <div className={styles.Details}>{props.genres.map((item, index) => (index ? ', ': '') + item.name)}</div>
            </div>
            <div className={styles.featureContainer}>
                <div className={styles.Heading}>Runtime:</div>
                <div className={styles.Details}>{props.runtime + " min" || props.runtime.map((item, index) => (index ? ', ': '') + item +' min')}</div>
            </div>

            <div className={styles.featureContainer}>
                <div className={styles.Heading}>Age Rating:</div>
                <div className={styles.Details}>{props.adult ? "A": "UA"}</div>
            </div>
        </div>
    )
}

export default moviebasic;
