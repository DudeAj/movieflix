import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const setError = (error) => {
    return {
        type: actionTypes.ITEM_ERROR,
        error: error
    }
}

export const setItems = (data) => {
    return {
        type: actionTypes.SET_ITEM,
        item: data
    }
}

export const itemLoadingStart = () => {
    return {
        type: actionTypes.ITEM_LOADING_START
    }
}

export const getItem = (link) => {

    return dispatch => {
        dispatch(itemLoadingStart());
        axios.get(link)
            .then(res => {
                // console.log(res.data)
                dispatch(setItems(res.data))
            })
            .catch(err => {
                dispatch(setError(err))
            })
    }
}


export const setEpisode = (data) => {
    return {
        type: actionTypes.SET_EPISODE,
        payload: data
    }
}

export const getEpisodes = (link) => {
    return dispatch => {
        dispatch(itemLoadingStart());
        axios.get(link)
            .then(res => {
                let latestData = [];
                for (let keys in res.data.episodes) {
                    const value = { ...res.data.episodes[keys], watched: false }
                    latestData.push(value);
                }
                dispatch(setEpisode(latestData))
            })
            .catch(err => {
                dispatch(setError(err))
            })
    }
}
