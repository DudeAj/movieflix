import React from 'react';
import styles from './MovieItem.module.css';
import { useNavigate } from 'react-router-dom';


const MovieItem = (props) => {

    const navigate = useNavigate();

    const imgBaseURL = "https://www.themoviedb.org/t/p/w220_and_h330_face";


    const sendDetails = () => {
        navigate(`/details/${props.data.type}/${props.data.itemId}`);
    }
    return (
        <div className={styles.Container} onClick={sendDetails}>
            <div className={styles.ImageHolder}>
                <img src={imgBaseURL + props.data.poster} alt='not Loaded' />
            </div>
        </div>
    )
}

export default MovieItem
