import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchWatchList, AddToWatched, deleteItem } from '../../store/actions';
import styles from './Watchlist.module.css';
import MovieItem from './MovieItem/MovieItem';
import AuthContext from '../../context/auth';
import Spinner from '../../components/Spinner/spinner';
import Loader ,{AdvanceLoader}from '../../components/Loader/Loader';

const Watchlist = (props) => {
    const { pathname } = useLocation();
    const authCtx = React.useContext(AuthContext);

    useEffect(() => {
        props.loadWatchlist();
    }, [authCtx]);

    const addItemToWatchList = (id) => {

        props.addItemToWatched(id);
    }

    // if (props.loading) {
    //     return <Spinner />
    // }

    const deleteItem = (id) => {
        props.deleteItem(id);
    }
    return (
        <div className={styles.container}>
            {props.loading ? <Spinner /> : null}
            <h3 className={styles.Heading}>My Watchlist</h3>
            <div className={styles.MovieContainer}>
                <div className={styles.DataContainer}>
                    {props.watchlist && props.watchlist.map((item) => <div className={styles.movieItemContainer}><MovieItem key={item.id} data={item} addWatched={addItemToWatchList} deleteItem={deleteItem} /></div>)
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
        watchlist: state.movie.watchlist,
        loading: state.movie.loading
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
