import React from 'react';
import styles from './MovieItem.module.css';
import { useNavigate } from 'react-router-dom';
import Placeholder from '../../../assets/images/placeholderImage.png';


const MovieItem = (props) => {
    const navigate = useNavigate();
    const type = props.data.original_title ? 'movie' : 'tv';
    const id = props.data.id
    // 
    const imgBaseURL = "https://www.themoviedb.org/t/p/w220_and_h330_face";


    const sendDetails = () => {
        navigate(`/details/${type}/${id}`);
    }
    return (
        <div className={styles.Container} onClick={sendDetails}>
            <div className={styles.ImageHolder}>
                {props.data.poster_path ?
                    <img src={`${imgBaseURL}${props.data.poster_path}`} alt="poster" />
                    : <img src={Placeholder} alt="poster" />}
                {/* <img src={imgBaseURL + props.data.poster_path || Placeholder} alt='not Loaded' /> */}
            </div>
        </div>
    )
}

export default MovieItem
