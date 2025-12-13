import React from 'react';
import styles from './LoadMore.module.css';

const LoadMore = (props) => {
    return (
        <div className={styles.LoadMoreContainer}>
            <div onClick={props.clicked} className={styles.LoadMore}>Load More </div> 
        </div>
    )
}

export default LoadMore
