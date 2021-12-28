import * as actionTypes from '../actionTypes';

const initialState = {
    country_code: "",
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.USER_COUNTRY:
            return {
                ...state, 
                country_code:action.country_code
            }

        default: 
            return state;
    }
}

export default reducer;