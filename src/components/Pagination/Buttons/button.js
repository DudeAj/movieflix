import React from 'react';
import styles from './button.module.css';


const button = (props) => {
    return (
        <button className={styles.Btn}>{props.value}</button>
    )
}

export default button
