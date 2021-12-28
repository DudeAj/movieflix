import * as actionTypes from '../actionTypes';

const initialState = {
    trending:null,
    PopularMovie:null,
    PopularTv:null,
    latestMovie:null,
    latestTv:null
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_TRENDING:
            return {
                ...state,
                trending:action.trending
            }

        case actionTypes.SET_POPULAR_MOVIE:
            return {
                ...state,
                PopularMovie:action.popularMovie
            }
        
        case actionTypes.SET_POPULARTV:
            return {
                ...state,
                PopularTv:action.popularTv
            }

        case actionTypes.LATEST_MOVIE:
            return {
                ...state,
                latestMovie:action.latestMovie
            }

        case actionTypes.LATEST_TV:
            return {
                ...state,
                latestTv:action.latestTv
            }

        default:
            return state;
    }
};

export default reducer;