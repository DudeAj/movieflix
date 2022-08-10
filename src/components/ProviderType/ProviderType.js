import React from 'react';
import {connect} from 'react-redux';
import styles from './ProviderType.module.css';

const ProviderType = (props) => {

    const originalURL = 'https://image.tmdb.org/t/p/original';
    return (
        <div className={styles.provideContainer}>
        <span>Stream</span>
        <div className={styles.platformContainer}>
            {props.items.map(pro => {
                return <div key={pro.provider_id} className={styles.provider}><img src={originalURL + pro.logo_path} loading="lazy" alt="logo_path"/>{/* <p>{pro.provider_name}</p> */}</div>
            })}
        </div>
    </div>
    )
}

export default ProviderType
