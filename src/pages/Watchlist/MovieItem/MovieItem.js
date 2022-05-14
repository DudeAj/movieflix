import React from 'react';
import styles from './MovieItem.module.css';
import { useNavigate } from 'react-router-dom';
import { Delete, Check } from '@mui/icons-material';


const MovieItem = (props) => {

    const navigate = useNavigate();

    const imgBaseURL = "https://www.themoviedb.org/t/p/w220_and_h330_face";

    const deleteContent = () => {
        console.log("delete")
    }

    const addWatched = () => {
        console.log("add watched")
    }

    const sendDetails = () => {
        navigate(`/details/${props.data.type}/${props.data.itemId}`);
    }
    return (
        <div className={styles.Container} >
            <div className={styles.ImageHolder} onClick={sendDetails}>
                <img src={imgBaseURL + props.data.poster} alt='not Loaded' />
            </div>
            
            <Delete className={styles.icon} onClick={deleteContent}/>
            <Check className={styles.checkIcon} onClick={addWatched}/>
            
        </div>
    )
}

export default MovieItem
