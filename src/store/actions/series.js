import * as actionTypes from '../actionTypes';
import axios from 'axios';

const trendingData = '/3/trending/all/day';
const popularMovieLink = "/3/movie/popular?page=";
const popularTv = "/3/tv/popular?page=";
const latestMovie = "/3/discover/movie?include_adult=false";
const latestTv = "/3/discover/tv?include_adult=false";


const StartLoading = () => {
    return {
        type: actionTypes.START_LOADING,
        payload:true
    }
}

export const setDiscover = (data) => {
    return {
        type: actionTypes.DISCOVER,
        payload: data
    }
}

export const getDiscover = (url) => {
    return dispatch => {
        StartLoading(true);
        axios.get(url).then(response => {
            //console.log(response.data);
            dispatch(setDiscover(response.data.results))
            StartLoading(false);
        })
        .catch(error => {
            console.log(error);
            StartLoading(false);
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
                console.log(err)
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
                console.log(err)
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
                console.log(err)
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
                console.log(err)
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
                console.log(err)
            })
    }
}




