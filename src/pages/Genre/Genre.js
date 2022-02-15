import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import styles from './genre.module.css';
import MovieItem from '../../components/MovieItems/MovieItem/MovieItem';
import LoadMore from '../../components/UI/LoadMore/LoadMore';
import * as actions from '../../store/actions';
import AllProvider from '../../components/AllProvider/AllProvider';

const Genre = (props) => {

    
    const activeClass = [styles.active];
    const movieType = useRef();
    const tvType = useRef();

    const [Page, setPage] = useState(1);
    const [Type, setType] = useState("movie");
    const [selectedGenre, setSelectedGenre] = useState([]);
    const [Item, setItem] = useState([]);
    const [releaseYear, setReleaseYear] = useState('1900-01-01');
    const [show, setShow] = useState(false);
    const [showGenre, setShowGenre] = useState(false);

    const originalURL = 'https://image.tmdb.org/t/p/original';
    useEffect(() => {
        const discoverLink = "https://api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&year=2019&with_genres=19&with_watch_providers=124&with_watch_monetization_types=flatrate";
        props.getAllProviders(Type)
        props.loadGenre(Type);

    }, [Type, Page]);

    const data = (filterType) => {
        if (filterType === "movie") {
            setType("movie");
            movieType.current.className = activeClass;
            tvType.current.className = "";
        }

        if (filterType === "tv") {
            setType("tv");
            tvType.current.className = activeClass;
            movieType.current.className = "";
        }
    }

    const setGenre = (id) => {
        console.log("Clicked: " + id);
        const latestGenre = [...selectedGenre, id];
        setSelectedGenre(latestGenre);
    }

    const setProvider = (id) => {
        console.log("Provider ID: " + id);
    }

    return <div className={styles.container}>
        <h3 className={styles.Heading}>Filter By Genre</h3>
        <div className={styles.providerHolder}>
            <AllProvider items={props.allProvider} handleProvider={setProvider}/>
        </div>
        <div className={styles.FilterArea}>
            <div className={styles.Type}>
                <h4 ref={movieType} onClick={() => data("movie")}>Movies</h4>
                <h4 ref={tvType} onClick={() => data("tv")}>Series</h4>
            </div>
            <div className={styles.Filter}>
                <h4>Filter By</h4>
            </div>
            <div className={styles.Type}>
                <div className='mx-2'>
                    <button className='btn btn-warning' onClick={() => {
                        setShow(!show)
                        setShowGenre(false)
                    }
                    }>Release Year</button>
                    {show && <div className={styles.popupforRelease + " bg-white d-flex justify-content-center p-2"}>
                        <progress className={styles.progress + " "} value="50" max="122"></progress>
                    </div>}
                </div>

                <div className='mx-2'>
                    <button className='btn btn-warning' onClick={() => {
                        setShowGenre(!showGenre)
                        setShow(false)}}>Genre</button>
                    {
                        showGenre && <div className={styles.popupforGenre + " bg-white d-flex justify-content-center p-2"}>
                            <div className='row p-2'>
                                {props.genre.map(item => {
                                    return <div className={styles.genreOption + ' col-6 text-black'} key={item.id} onClick={() => setGenre(item.id)}>
                                        {item.name}
                                    </div>
                                })}
                            </div>
                        </div>
                    }
                </div>
                <select>
                    <option>Rating</option>
                </select>
            </div>
        </div>
        <div className={styles.DataContainer}>
            {/* {Item.map((item) => <MovieItem key={item.id} data={item} />)
            } */}
        </div>
        <LoadMore clicked={() => setPage(Page + 1)} />
    </div>;
};

const mapStateToProps = state => {
    return {
        discover: state.movie.discover,
        allProvider: state.provider.allProviders,
        genre: state.movie.genre
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadGenre: (type) => dispatch(actions.getGenre(type)),
        fetchDiscover: (url) => dispatch(actions.getDiscover(url)),
        getAllProviders: (type) => dispatch(actions.getAllProviders(type)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Genre);
