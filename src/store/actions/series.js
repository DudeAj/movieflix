import * as actionTypes from '../actionTypes';
import axios from 'axios';

    const trendingData = 'https://api.themoviedb.org/3/trending/all/day?api_key=2572250a3cd36f9f144b61d06877ba1d';
    const popularMovieLink = "https://api.themoviedb.org/3/movie/popular?api_key=2572250a3cd36f9f144b61d06877ba1d&language=en-US&page=1";
    const popularTv = "https://api.themoviedb.org/3/tv/popular?api_key=2572250a3cd36f9f144b61d06877ba1d&language=en-US&page=1";
    const latestMovie ="https://api.themoviedb.org/3/discover/movie?api_key=2572250a3cd36f9f144b61d06877ba1d&language=en-US&include_adult=false";
    const latestTv ="https://api.themoviedb.org/3/discover/tv?api_key=2572250a3cd36f9f144b61d06877ba1d&language=en-US&include_adult=false";
    //const tvMovie = "https://api.themoviedb.org/3/discover/tv?api_key=2572250a3cd36f9f144b61d06877ba1d&language=en-US&include_adult=true";

export const setTrending = (trendingMovie) => {
    return {
        type:actionTypes.SET_TRENDING,
        trending:trendingMovie
    }
}

export const getTrending = () => {
    return dispatch => {
        axios.get(trendingData)
        .then((res)=> {
            dispatch(setTrending(res.data.results))
        })
        .catch(err=> {
            console.log(err)
        })
    }
}


export const setPopularMovie = (allMovie) => {
    return {
        type:actionTypes.SET_POPULAR_MOVIE,
        popularMovie:allMovie
    }
}

export const getPopularMovie = () => {
    return dispatch => {
        axios.get(popularMovieLink)
        .then((res)=> {
            dispatch(setPopularMovie(res.data.results))
        })
        .catch(err=> {
            console.log(err)
        })
    }
}

export const setPopularTv = (item) => {
    return {
        type:actionTypes.SET_POPULARTV,
        popularTv:item
    }
}

export const getPopularTv = () => {
    return dispatch => {
        axios.get(popularTv)
        .then((res)=> {
            dispatch(setPopularTv(res.data.results))
        })
        .catch(err=> {
            console.log(err)
        })
    }
}

export const setLatestMovie = (item) => {
    return {
        type:actionTypes.LATEST_MOVIE,
        latestMovie:item
    }
}

export const getLatestMovie = () => {
    return dispatch => {
        axios.get(latestMovie)
        .then((res)=> {
            dispatch(setLatestMovie(res.data.results))
        })
        .catch(err=> {
            console.log(err)
        })
    }
}

export const setLatestTv = (item) => {
    return {
        type:actionTypes.LATEST_TV,
        latestTv:item
    }
}

export const getLatestTv = () => {
    return dispatch => {
        axios.get(latestTv)
        .then((res)=> {
            dispatch(setLatestTv(res.data.results))
        })
        .catch(err=> {
            console.log(err)
        })
    }
}




