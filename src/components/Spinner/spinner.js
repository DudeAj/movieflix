import React from 'react';
import styles from './spinner.module.css';

const spinner = () => {
    return (
        <div className={styles.background}>
            <div className={styles.loader}>Loading...</div>
        </div>
    )
}

export default spinner;
