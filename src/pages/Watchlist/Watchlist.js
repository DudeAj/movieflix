import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchWatchList } from '../../store/actions';
import styles from './Watchlist.module.css';
import MovieItem from './MovieItem/MovieItem';

const Watchlist = (props) => {
    const { pathname } = useLocation();

    useEffect(() => {
        props.loadWatchlist(props.token);
    }, [props.token]);

    if (!props.isLoggedin) {
        return <Navigate to={"/login"} state={pathname} />
    }
    return (
        <div className={styles.container}>
            <h3 className={styles.Heading}>My Watchlist</h3>
            <div className={styles.DataContainer}>
                {props.watchlist && props.watchlist.map((item) => <MovieItem key={item.id} data={item} />)
                }
            </div>
            {/* <LoadMore clicked={() => setPage(Page + 1)} /> */}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoggedin: state.auth.isLoggedin,
        token: state.auth.userToken,
        watchlist: state.movie.watchlist
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadWatchlist: (token) => dispatch(fetchWatchList(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Watchlist);
