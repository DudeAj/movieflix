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
    const [selectedProvider, setSelectedProvider] = useState("");
    const [Item, setItem] = useState([]);
    const [releaseYear, setReleaseYear] = useState(0);
    const [show, setShow] = useState(false);
    const [showGenre, setShowGenre] = useState(false);

    const originalURL = 'https://image.tmdb.org/t/p/original';

    useEffect(() => {
        let filterGenre = "";
        let filterYear = "";
        if (selectedGenre.length > 0) {
            filterGenre = "&with_genres=" + selectedGenre.join(',')
        }

        if (releaseYear !== 0) {
            filterYear = "&year=" + releaseYear;
        }

        props.getAllProviders(Type)
        props.loadGenre(Type);
        data(Type);
        const discoverLink = `3/discover/${Type}?sort_by=popularity.desc&include_adult=true&include_video=false&page=${Page}${filterYear}${filterGenre}${selectedProvider}`;
        props.fetchDiscover(discoverLink);


    }, [Type, selectedProvider, Page, selectedGenre, releaseYear]);

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
        if (selectedGenre.includes(id)) {
            const latestGenre = selectedGenre.filter(genre => genre !== id);
            setSelectedGenre(latestGenre);
        }
        else {
            console.log("Clicked: " + id);
            const latestGenre = [...selectedGenre, id];
            setSelectedGenre(latestGenre);
        }
    }

    const selectedItems = (item) => {
        let selectedClass;
        if (selectedGenre.includes(item.id)) {
            selectedClass = styles.genreOption + ' col-6 text-white bg-dark';
        }
        else {
            selectedClass = styles.genreOption + ' col-6 text-black';
        }
        return <div
            className={selectedClass}
            key={item.id}
            onClick={() => setGenre(item.id)}>
            {item.name}
        </div>
    }

    const ShowAllGenre = () => {
        return <div className={styles.popupforGenre + " d-flex justify-content-center p-2"}>
            <div className='row p-2'>
                {props.genre.map(item => {
                    return selectedItems(item);
                })}
            </div>
        </div>
    }

    const releaseYearChangeHandler = (e) => {
        const year = e.target.value;
        setReleaseYear(year);
    }

    const ShowPopupforYear = () => {
        return <div className={styles.popupforRelease + " p-2"}>
            <input type="range" className="form-range" value={releaseYear} onChange={releaseYearChangeHandler} min="1900" max="2022" id="customRange2" />
            <div className='row'>
                <span className='col-6 text-start'>1900</span>
                <span className='col-6 text-end'>{new Date().getFullYear()}</span>
            </div>
        </div>
    }

    const setProvider = (id) => {
        setSelectedProvider(`&with_watch_providers=${id}`);
    }

    return <div className={styles.container}>
        <h3 className={styles.Heading}>Filter By Genre</h3>
        <div className={styles.providerHolder}>
            <AllProvider items={props.allProvider} handleProvider={setProvider} />
        </div>

        <div className={styles.FilterArea}>
            <div className={styles.Type}>
                <h5 ref={movieType} onClick={() => data("movie")}>Movies</h5>
                <h5 ref={tvType} onClick={() => data("tv")}>Series</h5>
            </div>
            <div className={styles.Filter}>
                <h5>Filter By</h5>
            </div>
            <div className={styles.Type}>
                {/* For Release Year */}
                <div className='mx-2'>
                    <button className='btn btn-warning' onClick={() => {
                        setShow(!show)
                        setShowGenre(false)
                    }
                    }>Release Year</button>
                    {show && ShowPopupforYear()}
                </div>
                {/* For Genre */}
                <div className='mx-2'>
                    <button className='btn btn-warning' onClick={() => {
                        setShowGenre(!showGenre)
                        setShow(false)
                    }}>Genre</button>
                    {showGenre && ShowAllGenre()}
                </div>

            </div>
        </div>

        <div className={styles.DataContainer}>
            {props.discover.map((item) => <MovieItem key={item.id} data={item} />)
            }
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
