import * as actionTypes from '../actionTypes';

const initialState = {
    watch_providers:{}
}


const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.WATCH_PROVIDER:
            return {
                ...state,
                watch_providers:action.watch_providers
            }
        
        default:
            return state;
        
    }
}



export default reducer;