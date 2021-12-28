import React, {useState} from 'react';
import styles from './Episode.module.css';
import CheckIcon from '@mui/icons-material/Check';
import { useParams } from 'react-router-dom';

const Episode = (props) => {
    const [show, setShow] = useState(false)
    const watchStatus = props.episode.watched ? 'green' : '#333';
    return (
        <div key={props.episode.id} className={styles.MainContainer}>
            <div
                className={styles.Holder}>
                <div className={styles.Episode} onClick={()=> setShow(!show)}>
                    <span className={styles.seasonEpisode}>S{props.episode.season_number} E{props.episode.episode_number} - </span>
                    <p> {props.episode.name}</p>
                </div>
                <div className={styles.iconHolder}>
                    <div className={styles.iconBackground} style={{ backgroundColor: watchStatus }} >
                        <CheckIcon />
                        <p>{props.episode.watched}</p>
                    </div>
                </div>
            </div>
            {show &&
            <div className={styles.overview}>
                {props.episode.overview ||"Description not Available"}
            </div>}
        </div>
    )
}

export default Episode
