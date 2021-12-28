import React from 'react';
import styles from './topContainer.module.css';

const topContainer = () => {
    return (
        <div className={styles.Container}>
            <h2 className={styles.heading}>Movies and TV shows for you </h2>
        </div>
    )
}

export default topContainer
