import * as actionTypes from '../actionTypes';
import axios from 'axios'

export const setCountry = (country_code) => {
    return {
        type:actionTypes.USER_COUNTRY,
        country_code:country_code,
    }
}

export const getCountry = () => {
    return dispatch => {
            axios.get('https://ipapi.co/json/').then((response) => {
                let info = response.data;
                dispatch(setCountry(info.country_code))
            }).catch((error) => {
                console.log(error);
            });
    }
}


export const updateCountry= (code) => {
    return dispatch => {
        dispatch(setCountry(code))
    }
}