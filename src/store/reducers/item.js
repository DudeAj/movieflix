import * as actionTypes from '../actionTypes';

const initialState = {
    item:[],
    episodes:[],
    error:null,
    loading:true
}

const reducer = (state=initialState,action) => {
    switch(action.type) {
        case actionTypes.SET_ITEM:
            return {
                ...state,
                item:action.item,
                loading:false
            }

        case actionTypes.ITEM_LOADING_START:
            return {
                ...state,
                loading:true,
            }
        
        case actionTypes.SET_EPISODE:
            return {
                ...state,
                episodes:action.payload
            }

        case actionTypes.ITEM_ERROR:
            return {
                ...state,
                error:action.error
            }

        default:
            return state;
    }
}

export default reducer;