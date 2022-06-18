import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchWatchList, AddToWatched, deleteItem } from '../../store/actions';
import styles from './Watchlist.module.css';
import MovieItem from './MovieItem/MovieItem';
import AuthContext from '../../context/auth';

const Watchlist = (props) => {
    const { pathname } = useLocation();
    const authCtx = React.useContext(AuthContext);

    useEffect(() => {
        console.log("triggerd watchlist")
        props.loadWatchlist();
    }, [authCtx]);

    if (!authCtx.isLoggedin) {
        return <Navigate to={"/login"} state={pathname} />
    }

    const addItemToWatchList = (id) => {
        console.log("add to list")
        props.addItemToWatched(id);
    }

    const deleteItem = (id) => {
        props.deleteItem(id);
    }
    return (
        <div className={styles.container}>
            <h3 className={styles.Heading}>My Watchlist</h3>
            <div className={styles.MovieContainer}>
                <div className={styles.DataContainer}>
                    {props.watchlist && props.watchlist.map((item) => <MovieItem key={item.id} data={item} addWatched={addItemToWatchList} deleteItem={deleteItem} />)
                    }
                </div>
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
        loadWatchlist: () => dispatch(fetchWatchList()),
        addItemToWatched: (id) => dispatch(AddToWatched(id)),
        deleteItem: (id) => dispatch(deleteItem(id))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Watchlist);
