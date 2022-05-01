import * as actionTypes from '../actionTypes';

export const setLogin = (data) => {
    return {
        type: actionTypes.LOGGED_IN,
        payload: data
    }
}

export const LogoutUser = () => {
    return {
        type: actionTypes.LOGGED_IN,
        payload: {
            token: null,
            isLogin: false
        }
    }
}

export const setLoginAsync = (token) => {
    return dispatch => {
        dispatch(setLogin({ token: token, isLogin: true }))
    }
}