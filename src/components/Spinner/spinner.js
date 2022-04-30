import React from 'react';
import styles from './spinner.module.css';
import { CircularProgress } from '@mui/material'

const spinner = () => {
    return (
        <div className={styles.background}>
            <CircularProgress />
        </div>
    )
}

export default spinner;
