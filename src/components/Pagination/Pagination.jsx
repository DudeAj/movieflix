import React from 'react';
import styles from './Pagination.module.css';
import Btn from './Buttons/button';

const Pagination = () => {
    return (
        <div className={styles.buttonHolder}>
            <Btn value='<' />
            <Btn value='2' />
            <Btn value='3' />
            <Btn value='4' />
            <Btn value='>' />
        </div>
    )
}

export default Pagination
