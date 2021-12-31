import React from 'react';
import styles from './searchItem.module.css';
import placeholderImage  from '../../../assets/images/placeholderImage.png';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setBackrop} from '../../../store/actions'

const SearchItem = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const imagePath = `https://image.tmdb.org/t/p/w45`;
    const ShowDetails = () => {
        dispatch(setBackrop(false))
        navigate(`/details/${props.data.media_type}/${props.data.id}`)
    }
    return (
        <div className={styles.searchItemContainer} onClick={ShowDetails}>
            <div className={styles.imgContainer}>
               {props.data.poster_path ? <img src={imagePath+ props.data.poster_path}/> : <img src={placeholderImage}/> }
            </div>
            <div className={styles.infoContainer}>
                <p className={styles.Heading}>{props.data.title || props.data.name}</p>
                <p className={styles.subInfo}>{props.data.media_type}</p>
            </div>
        </div>
    )
}

export default SearchItem
