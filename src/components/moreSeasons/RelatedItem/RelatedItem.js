import React from 'react';
import styles from './RelatedItem.module.css';
import { useNavigate } from 'react-router-dom';
import placeHolderImage from '../../../assets/images/placeholderImage.png';


const MovieItem = (props) => {

    //  

    const navigate = useNavigate();
    //const params = useParams();
    const imgBaseURL = "https://www.themoviedb.org/t/p/w220_and_h330_face";

    const sendDetails = () => {
        // 
        if (props.seasonId) {
            navigate(`/details/${props.type}/${props.seasonId}/season-${props.details.season_number}`)
        }
        else {
            navigate(`/details/${props.type}/${props.details.id}/`)
        }
    }
    return (
        <div className={styles.Container} onClick={sendDetails}>
            <div className={styles.ImageHolder}>
                {props.details.poster_path
                    ? <img src={imgBaseURL + props.details.poster_path} alt='not Loaded' loading="lazy" />
                    : <img src={placeHolderImage} alt='not Loaded' style={{ objectFit: 'cover' }} loading="lazy"/>}
            </div>
            <p className={styles.title}>{props.details.name || props.details.title}</p>
        </div>
    )
}

export default MovieItem
