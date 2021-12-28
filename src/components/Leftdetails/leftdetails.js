import React from 'react';
import {connect} from 'react-redux';
import styles from './leftdetails.module.css';
import Moviebasic from '../movieBasic/moviebasic';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CheckIcon from '@mui/icons-material/Check';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const leftdetails = (props) => {
    
   // const seasonNumber = params.season ? params.season.split('-')[1] : null;
    const imgBaseURL = "https://www.themoviedb.org/t/p/w220_and_h330_face";
    const seasonNum = props.seasonNumber-1 < 0 ? 1 : props.seasonNumber;
    console.log(seasonNum)
    const poster = props.seasonNumber ? props.item.seasons[seasonNum-1].poster_path : props.item.poster_path
    return (
        <div className={styles.Left}>
            <img src={imgBaseURL + poster} />
            <div className={styles.imgBottom}>
                <div>
                    <BookmarkIcon className={styles.icon} />
                    <p>Watchlist</p>
                </div>
                <div>
                    <CheckIcon className={styles.icon} />
                    <p>Seen</p>
                </div>

                <div>
                    <ThumbUpIcon className={styles.icon} />
                    <p>Like</p>
                </div>

                <div>
                    <ThumbDownIcon className={styles.icon} />
                    <p>Dislike</p>
                </div>
            </div>

            <button className={styles.btn}>Sign In To sync Watchlist</button>
            <hr style={{ borderColor: 'grey' }} />

            <Moviebasic genres={props.item.genres} runtime={props.item.episode_run_time || props.item.runtime} rating={props.item.vote_average} />
        </div>
    )
}

export default leftdetails
