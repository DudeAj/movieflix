import React, { useEffect, useState } from 'react';
import styles from './Popular.module.css';
import { connect } from 'react-redux';
import MovieItem from '../../components/MovieItems/MovieItem/MovieItem';
import LoadMore from '../../components/UI/LoadMore/LoadMore';
import { getPopularMovie, getPopularTv } from '../../store/actions';

import MovieItemShimmer from '../../Shimmer/MovieItemShimmer';

const arraySuffle = (arr) => {
    return arr.sort(() => Math.random() - 0.5)
}

const Popular = (props) => {
    const [Page, setPage] = useState(1);

    useEffect(() => {
        if (Page > 1) {
            props.fetchMoreTv(Page);
            props.fetchMoreMovie(Page);
        }
    }, [Page]);

    return (
        <div className={styles.container}>
            <h3 className={styles.Heading}>Popular Movies</h3>

            {/* <MovieItemShimmer items={22} /> */}
            <div className={styles.DataContainer}>
                {props.MovieData.map((item, index) => <MovieItem key={index} data={item} />)
                }
            </div>
            <LoadMore clicked={() => setPage(Page + 1)} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        MovieData: arraySuffle([...state.movie.PopularMovie, ...state.movie.PopularTv]),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchMoreMovie: (page) => dispatch(getPopularMovie(page)),
        fetchMoreTv: (page) => dispatch(getPopularTv(page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Popular);
