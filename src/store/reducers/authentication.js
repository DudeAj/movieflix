import * as actionTypes from '../actionTypes';

const initialState = {
    authenticated: true,
    isLoggedin: false,
    userToken: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGGED_IN:
            return {
                ...state,
                isLoggedin: action.payload.isLogin,
                userToken: action.payload.token
            }
        default:
            return state
    }
}

export default authReducer;