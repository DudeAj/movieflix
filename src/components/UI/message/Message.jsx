import React from 'react';
import styles from './message.module.css';

const Message = ({ msg, type }) => {

    return (
        <div className={styles.background}>
            <p>{msg}</p>
        </div >
    )
}

export default Message