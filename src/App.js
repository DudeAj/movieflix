import React, { useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import PagesContainer from './containers/PagesContainer/PagesContainer';
import Detailspage from './pages/DetailsPage/detailspage';
import Login from './pages/Login/Login';
import Logout from './pages/Logout/Logout';

import * as actions from './store/actions';
import Popular from './pages/Popular/Popular';
import Watchlist from './pages/Watchlist/Watchlist';
import Watched from './pages/Watched/Watched';
import Genre from './pages/Genre/Genre';
import Backdrop from './components/Backdrop/backdrop';
import "./firebase";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './hoc/Layout';
import customAxios from './utils/customReq';



customAxios.defaults.headers.common['auth-token'] = localStorage.getItem("movieToken");
axios.defaults.baseURL = 'https://api.themoviedb.org';
axios.interceptors.request.use(config => {
  config.params = {
    api_key: '2572250a3cd36f9f144b61d06877ba1d',
    language: 'en-US',
    watch_region: 'IN'
  };
  return config;
});

const App = (props) => {

  useEffect(() => {
    props.loadTrending()
    props.loadPopular(1)
    props.loadPopularTv(1)
    props.loadLatestMovie()
    props.loadLatestTv()
    props.userinfo()

  }, [props.token])

  return (
    <div>

      <div className="App">
        {/* <ToastContainer autoClose={2000} /> */}
        {props.backdropState && <Backdrop />}
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<PagesContainer />} />
            <Route path='/login' element={<Login />} />
            <Route path='/details/:type/:id' exact element={<Detailspage />} />
            <Route path='/details/:type/:id/:season' exact element={<Detailspage />} />
            <Route path='/popular' element={<Popular />} />
            <Route path='/watchlist' element={<Watchlist />} />
            <Route path='/watched' element={<Watched />} />
            <Route path='/genre' element={<Genre />} />
            <Route path='/logout' element={<Logout />} />
          </Route>
        </Routes>

      </div>

    </div>
  );
}

const mapStateToProps = state => {
  return {
    auth: state.auth.authenticated,
    isLoggedin: state.auth.isLoggedin,
    backdropState: state.user.backdrop,
    token: state.user.userToken
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadTrending: () => dispatch(actions.getTrending()),
    loadPopular: (num) => dispatch(actions.getPopularMovie(num)),
    loadPopularTv: (num) => dispatch(actions.getPopularTv(num)),
    loadLatestMovie: () => dispatch(actions.getLatestMovie()),
    loadLatestTv: () => dispatch(actions.getLatestTv()),
    userinfo: () => dispatch(actions.getCountry()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
