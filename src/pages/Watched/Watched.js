import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchWatched, deleteItem } from '../../store/actions';
import styles from './Watched.module.css';
import MovieItem from './MovieItem/MovieItem';
import AuthContext from '../../context/auth';

const Watched = (props) => {
    const { pathname } = useLocation();
    const authCtx = React.useContext(AuthContext);

    useEffect(() => {
        props.loadWatched();
    }, [authCtx]);

    if (!authCtx.isLoggedin) {
        return <Navigate to={"/login"} state={pathname} />
    }

    const deleteItem = (id) => {
        props.deleteItem(id);
        props.loadWatched();

    }
    return (
        <div className={styles.container}>
            <h3 className={styles.Heading}>Already Watched</h3>
            <div className={styles.DataContainer}>
                {props.watched && props.watched.map((item) => <MovieItem key={item.id} data={item} deleteItem={deleteItem} />)
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
        watched: state.movie.watched
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadWatched: () => dispatch(fetchWatched()),
        deleteItem: (id) => dispatch(deleteItem(id))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Watched);
