import * as actionTypes from '../actionTypes';
import axios from 'axios';


const setWatchProviders = (provider) => {
    return {
        type: actionTypes.WATCH_PROVIDER,
        watch_providers: provider
    }
}

const setAllProviders = (provider) => {
    return {
        type: actionTypes.ALL_PROVIDERS,
        payload: provider
    }
}


export const getAllProviders = (type) => {
    return dispatch => {
        const url = `/3/watch/providers/${type}?`
        axios.get(url)
            .then(response => {
                //console.log(response.data.results);
                dispatch(setAllProviders(response.data.results))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const getWatchProviders = (type, id,) => {
    return dispatch => {
        const watchPoviders = `/3/${type}/${id}/watch/providers`;
        axios.get(watchPoviders).then(res => {
            dispatch(setWatchProviders(res.data.results))
            //setProvider(res.data.results)
        })
    }
}