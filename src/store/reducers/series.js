import * as actionTypes from '../actionTypes';

const initialState = {
    trending: [],
    PopularMovie: [],
    PopularTv: [],
    latestMovie: [],
    latestTv: [],
    genre: [],
    discover: [],
    watchlist: [],
    watched:[],
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_TRENDING:
            return {
                ...state,
                trending: action.trending
            }

        case actionTypes.SET_POPULAR_MOVIE:
            return {
                ...state,
                PopularMovie: [...state.PopularMovie, ...action.popularMovie]
            }

        case actionTypes.SET_POPULARTV:
            return {
                ...state,
                PopularTv: action.popularTv
            }

        case actionTypes.LATEST_MOVIE:
            return {
                ...state,
                latestMovie: action.latestMovie
            }

        case actionTypes.LATEST_TV:
            return {
                ...state,
                latestTv: action.latestTv
            }

        case actionTypes.GENRE:
            return {
                ...state,
                genre: action.genre
            }

        case actionTypes.DISCOVER:

            return {
                ...state,
                discover: action.payload
            }

        case actionTypes.START_LOADING:

            return {
                ...state,
                loading: action.payload
            }

        case actionTypes.SET_WATCHLIST:
            return {
                ...state,
                watchlist: action.payload
            }

        case actionTypes.SET_WATCHED:
            return {
                ...state,
                watched: action.payload
            }
        default:
            return state;
    }
};

export default reducer;