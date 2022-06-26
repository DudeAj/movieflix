import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchWatched, deleteItem } from '../../store/actions';
import styles from './Watched.module.css';
import MovieItem from './MovieItem/MovieItem';
import AuthContext from '../../context/auth';
import Spinner from '../../components/Spinner/spinner';

const Watched = (props) => {
    const { pathname } = useLocation();
    const authCtx = React.useContext(AuthContext);

    useEffect(() => {
        props.loadWatched();
    }, [authCtx]);

    const deleteItem = (id) => {
        props.deleteItem(id);
    }

    // if (props.loading) {
    //     return <Spinner />
    // }
    return (
        <div className={styles.container}>
            {props.loading ? <Spinner /> : null}
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
        watched: state.movie.watched,
        loading: state.movie.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadWatched: () => dispatch(fetchWatched()),
        deleteItem: (id) => dispatch(deleteItem(id))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Watched);
