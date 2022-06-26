import * as actionTypes from '../actionTypes';
import axios from 'axios';
import customeReq from '../../utils/customReq';
import { toast } from 'react-toastify';

const trendingData = '/3/trending/all/day';
const popularMovieLink = "/3/movie/popular?page=";
const popularTv = "/3/tv/popular?page=";
const latestMovie = "/3/discover/movie?include_adult=false";
const latestTv = "/3/discover/tv?include_adult=false";


export const startLoading = (value) => {
    return {
        type: actionTypes.START_LOADING,
        payload: value
    }
}

export const setDiscover = (data) => {
    return {
        type: actionTypes.DISCOVER,
        payload: data
    }
}

export const getDiscover = (Type, Page, filterYear, filterGenre, selectedProvider) => {
    return dispatch => {
        startLoading(true);

        axios.get(`3/discover/${Type}?sort_by=popularity.desc&include_adult=true&include_video=false&page=${Page}${filterYear}${filterGenre}${selectedProvider}`).then(response => {
            // 
            dispatch(setDiscover(response.data.results))
            startLoading(false);
        })
            .catch(error => {

                startLoading(false);
            })
    }
}

export const setGenre = (data) => {
    return {
        type: actionTypes.GENRE,
        genre: data
    }
}

export const getGenre = (type) => {
    return dispatch => {
        const url = `/3/genre/${type}/list?`
        axios.get(url)
            .then(response => {
                dispatch(setGenre(response.data.genres))
            })
    }
}

export const setTrending = (trendingMovie) => {
    return {
        type: actionTypes.SET_TRENDING,
        trending: trendingMovie
    }
}

export const getTrending = () => {
    return dispatch => {
        axios.get(trendingData)
            .then((res) => {
                dispatch(setTrending(res.data.results))
            })
            .catch(err => {

            })
    }
}


export const setPopularMovie = (allMovie) => {
    return {
        type: actionTypes.SET_POPULAR_MOVIE,
        popularMovie: allMovie
    }
}

export const getPopularMovie = (page_num) => {
    return dispatch => {
        axios.get(popularMovieLink + page_num)
            .then((res) => {
                dispatch(setPopularMovie(res.data.results))
            })
            .catch(err => {

            })
    }
}

export const setPopularTv = (item) => {
    return {
        type: actionTypes.SET_POPULARTV,
        popularTv: item
    }
}

export const getPopularTv = (page_num) => {
    return dispatch => {
        axios.get(popularTv + page_num)
            .then((res) => {
                dispatch(setPopularTv(res.data.results))
            })
            .catch(err => {

            })
    }
}

export const setLatestMovie = (item) => {
    return {
        type: actionTypes.LATEST_MOVIE,
        latestMovie: item
    }
}

export const getLatestMovie = () => {
    return dispatch => {
        axios.get(latestMovie)
            .then((res) => {
                dispatch(setLatestMovie(res.data.results))
            })
            .catch(err => {

            })
    }
}

export const setLatestTv = (item) => {
    return {
        type: actionTypes.LATEST_TV,
        latestTv: item
    }
}

export const getLatestTv = () => {
    return dispatch => {
        axios.get(latestTv)
            .then((res) => {
                dispatch(setLatestTv(res.data.results))
            })
            .catch(err => {

            })
    }
}





