import * as actionTypes from '../actionTypes';
import axios from 'axios';


const setWatchProviders = (provider) => {
    return {
        type:actionTypes.WATCH_PROVIDER,
        watch_providers:provider
    }
}

export const getWatchProviders = (type, id, ) => {
    return dispatch => {
        const watchPoviders = `https://api.themoviedb.org/3/${type}/${id}/watch/providers?api_key=2572250a3cd36f9f144b61d06877ba1d`;
        axios.get(watchPoviders).then(res=> {
            dispatch(setWatchProviders(res.data.results))
            //setProvider(res.data.results)
        })
    }
}