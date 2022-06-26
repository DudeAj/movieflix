export {
    getTrending,
    getPopularMovie,
    getPopularTv,
    getLatestMovie,
    getLatestTv,
    getGenre,
    getDiscover,

} from './series'

export {
    fetchWatchList,
    AddToWatched,
    fetchWatched,
    deleteItem
} from './watchlist';

export {
    getCountry,
    updateCountry,
    setBackrop,
    setSigninPopup
} from './user';

export {
    getWatchProviders,
    getAllProviders,
} from './provider';

export {
    getItem,
    getEpisodes
} from './item';

export {
    setLogin,
    LogoutUser,
    setLoginAsync
} from './auth'