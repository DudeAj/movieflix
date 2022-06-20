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

        }
    }
}

export const fetchWatched = () => {
    return async dispatch => {
        try {
            const watched = await customeReq.get('watch/watched');

            if (watched.data.status) {
                dispatch(setWatched(watched.data.results))
            }
        }
        catch (err) {

        }
    }
}

export const AddToWatched = (id) => {
    return async dispatch => {
        try {
            const postBody = { itemId: id };
            const watchList = await customeReq.post('watch/add-watched', postBody);

            dispatch(fetchWatchList())


        }
        catch (error) {

        }
    }
}

export const deleteItem = (id) => {
    return async dispatch => {
        try {
            const postBody = { itemId: id };
            const deletedItem = await customeReq.post('watch/delete', postBody);

            dispatch(fetchWatchList())
            dispatch(fetchWatched())


        }
        catch (error) {

        }
    }
}
