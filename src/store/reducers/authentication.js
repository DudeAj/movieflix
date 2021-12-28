import * as actionTypes from '../actionTypes';

const initialState = {
    authenticated:true
}

const authReducer = (state= initialState, action) => {
    switch(action.type) {
        case actionTypes.LOGGED_IN: 
            return {
                ...state,
                authenticated:action.value
            }
        default:
            return state
    }
}

export default authReducer;