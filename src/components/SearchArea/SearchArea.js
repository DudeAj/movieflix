import React, { useState, useEffect } from 'react';
import styles from './SearchArea.module.css';
import SearchItem from './SearchItem/searchItem';
import {useNavigate} from 'react-router-dom';

const SearchArea = (props) => {
    console.log(props.items.length)
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);

    useEffect(() => {
        const mv = [];
        const sr = [];
        for (let item of props.items) {
            if (item.media_type === 'movie') {
                mv.push(item);
            }

            if (item.media_type === 'tv') {
                sr.push(item);
            }
        }
        setMovies(mv.slice(0, 4));
        setSeries(sr.slice(0, 4));
    }, [])

    return (
        <div className={styles.SearchAreaContainer}>
            <div className={styles.searchAreaHolder}>
                <div className={styles.MovieTvContainer}>
                    <p className={styles.typeHeading}>Movies</p>
                    {movies.map((item) => {
                        if (item.media_type !== 'people') {
                            return (<SearchItem key={item.id} data={item} />);
                        }
                    })}
                </div>
                <div className={styles.PeopleContainer}>
                    <p className={styles.typeHeading}>Shows</p>
                    {series.map((item) => {
                        if (item.media_type !== 'people') {
                            return (<SearchItem key={item.id} data={item} />);
                        }
                    })}
                </div>
            </div>
            <div className={styles.MoreHolder}>
                <span>See All Results</span>
            </div>
        </div>
    )
}

export default SearchArea
