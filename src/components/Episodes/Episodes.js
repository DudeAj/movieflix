import React, { useState, useEffect } from 'react';
import styles from './Episodes.module.css';
import { connect } from 'react-redux';
import Episode from './Episode/Episode';

const Episodes = (props) => {
    const [show, setShow] = useState(true)
    console.log(props.episodes)
    
    return (
        <div className={styles.EpisodeContainer}>
            <p className={styles.Heading}>{props.episodes.length} Episodes</p>
            <div className={styles.EpisodeHolder}>
                {props.episodes.map((episode, index) => {
                    return (
                        <Episode key={episode.id} episode={episode}/>
                    )
                })}
            </div>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        episodes: state.item.episodes
    }
}
export default connect(mapStateToProps)(Episodes);
