import * as actionTypes from '../actionTypes';

const initialState = {
    watch_providers:{},
    allProviders:[]
}


const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.WATCH_PROVIDER:
            return {
                ...state,
                watch_providers:action.watch_providers
            }
        
        case actionTypes.ALL_PROVIDERS:
            return {
                ...state,
                allProviders:action.payload
            }
        
        default:
            return state;
        
    }
}



export default reducer;