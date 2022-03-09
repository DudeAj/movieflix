import React from 'react';
import Loader from 'react-loader-spinner';
import styles from './loader.module.css';

const loader = () => {
    return (
        <div className={styles.LoaderContainer}>
            <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
        </div>
    )
}

export default loader
