import * as actionTypes from '../actionTypes';
import axios from 'axios';
import customeReq from '../../utils/customReq';
import { toast } from 'react-toastify';

const setWatchList = (data) => {
    return {
        type: actionTypes.SET_WATCHLIST,
        payload: data
    }
}

const setWatched = (data) => {
    return {
        type: actionTypes.SET_WATCHED,
        payload: data
    }
}

export const fetchWatchList = () => {
    return async dispatch => {
        try {
            const watchList = await customeReq.get('watch/watchlist');
            if (watchList.data.status) {
                dispatch(setWatchList(watchList.data.results))
            } 
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const fetchWatched = () => {
    return async dispatch => {
        try {
            const watched = await customeReq.get('watch/watched');
            console.log("watched", watched)
            if (watched.data.status) {
                dispatch(setWatched(watched.data.results))
            } 
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const AddToWatched = (id) => {
    return async dispatch => {
        try {
            const postBody = {itemId:id};
            const watchList = await customeReq.post('watch/add-watched',postBody );
            console.log("response", watchList)
            dispatch(fetchWatchList())


        }
        catch(error) {
            console.log(error)
        }
    }
}

export const deleteItem = (id) => {
    return async dispatch => {
        try {
            const postBody = {itemId:id};
            const watchList = await customeReq.post('watch/delete',postBody );
            console.log("response", watchList)
            dispatch(fetchWatchList())


        }
        catch(error) {
            console.log(error)
        }
    }
}
