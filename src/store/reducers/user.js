import * as actionTypes from '../actionTypes';

const initialState = {
    country_code: "",
    backdrop:false
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.USER_COUNTRY:
            return {
                ...state, 
                country_code:action.country_code
            }
        case actionTypes.ENABLE_BACKDROP:
            return {
                ...state, 
                backdrop:action.value
            }

        default: 
            return state;
    }
}

export default reducer;