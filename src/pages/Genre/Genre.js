import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import styles from './genre.module.css';
import MovieItem from '../../components/MovieItems/MovieItem/MovieItem';
import LoadMore from '../../components/UI/LoadMore/LoadMore';
import * as actions from '../../store/actions';
import AllProvider from '../../components/AllProvider/AllProvider';
import Spinner from '../../components/Spinner/spinner';
import Popover from '@mui/material/Popover';
import { Button, Slider } from '@mui/material';

const Genre = (props) => {

    const activeClass = [styles.active];
    const movieType = useRef();
    const tvType = useRef();
    const [Page, setPage] = useState(1);
    const [Type, setType] = useState("movie");
    const [selectedGenre, setSelectedGenre] = useState([]);
    const [selectedProvider, setSelectedProvider] = useState("");
    const [releaseYear, setReleaseYear] = useState([2000, new Date().getFullYear()]);

    //popover setup for release year
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const openYear = Boolean(anchorEl);

    //popover setup for genre
    const [anchorElGenre, setAnchorElGenre] = React.useState(null);

    const handleGenre = (event) => {
        setAnchorElGenre(event.currentTarget);
    };

    const genreClose = () => {
        setAnchorElGenre(null);
    };

    const openGenre = Boolean(anchorElGenre);



    useEffect(() => {
        let filterGenre = "";
        let filterYear = "";

        if (selectedGenre.length > 0) {
            filterGenre = "&with_genres=" + selectedGenre.join(',')
        }

        if (releaseYear !== 0) {
            filterYear = "&release_date.gte=" + releaseYear[0] + "&release_date.lte=" + releaseYear[1];
        }

        props.getAllProviders(Type)
        props.loadGenre(Type);
        data(Type);
        props.fetchDiscover(Type, Page, filterYear, filterGenre, selectedProvider);


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
            selectedClass = styles.genreOption + " " + styles.selected;
        }
        else {
            selectedClass = styles.genreOption + " " + styles.unselected;
        }
        return <div
            className={selectedClass}
            key={item.id}
            onClick={() => setGenre(item.id)}>
            {item.name}
        </div>
    }

    function valuetext(value) {
        return `${value}°C`;
    }

    const [value, setValue] = React.useState([2000, new Date().getFullYear()]);

    const handleChange = (event, year) => {
        setReleaseYear(year);
    };


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
            <div className={styles.Type}>
                {/* For Release Year */}
                <div className={styles.typeBtnHolder}>
                    <Button sx={{ mx: 1 }} variant="contained" onClick={handleClick}>Release Year</Button>
                    <Popover
                        open={openYear}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <div className={styles.popupforRelease}>
                            <div className='row'>
                                <span className='col-6 text-start'>1900</span>
                                <span className='col-6 text-end'>{new Date().getFullYear()}</span>
                            </div>
                            <Slider
                                min={1900}
                                max={new Date().getFullYear()}
                                value={releaseYear}
                                onChange={handleChange}
                                valueLabelDisplay="auto"
                                size="small"
                                getAriaValueText={valuetext}
                            />
                            {/* <input type="range" className="form-range" value={releaseYear} onChange={releaseYearChangeHandler} min="1900" max="2022" id="customRange2" />*/}

                        </div>
                    </Popover>
                </div>
                {/* For Genre */}
                <div className={styles.typeBtnHolder}>
                    <Button sx={{ mx: 1 }} variant="contained" onClick={handleGenre}>Genre</Button>
                    <Popover
                        open={openGenre}
                        anchorEl={anchorElGenre}
                        onClose={genreClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <div className={styles.popupforGenre}>
                            <div className={styles.genreRow}>
                                {props.genre.map(item => {
                                    return selectedItems(item);
                                })}
                            </div>
                        </div>

                    </Popover>
                </div>
            </div>
        </div>

        <div className={styles.DataContainer}>
            {props.discover
                ? props.discover.map((item) => <MovieItem key={item.id} data={item} />)
                : <Spinner />
            }
        </div>
        <LoadMore clicked={() => setPage(Page + 1)} />
    </div>;
};

const mapStateToProps = state => {
    return {
        discover: state.movie.discover,
        allProvider: state.provider.allProviders,
        genre: state.movie.genre,
        loading: state.movie.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadGenre: (type) => dispatch(actions.getGenre(type)),
        fetchDiscover: (Type, Page, filterYear, filterGenre, selectedProvider) => dispatch(actions.getDiscover(Type, Page, filterYear, filterGenre, selectedProvider)),
        getAllProviders: (type) => dispatch(actions.getAllProviders(type)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Genre);
