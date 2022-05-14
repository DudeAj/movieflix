import * as actionTypes from '../actionTypes';

export const setLogin = (data) => {
    sessionStorage.setItem("token", data.token);
    return {
        type: actionTypes.LOGGED_IN,
        payload: data
    }
}

export const LogoutUser = () => {
    sessionStorage.removeItem("token")
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