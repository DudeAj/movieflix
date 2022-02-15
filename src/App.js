import React, {useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import PagesContainer from './containers/PagesContainer/PagesContainer';
import Detailspage from './pages/DetailsPage/detailspage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './store/actions';
import Popular from './pages/Popular/Popular';
import Watchlist  from './pages/Watchlist/Watchlist'
import Genre from './pages/Genre/Genre';
import Backdrop from './components/Backdrop/Backdrop';

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
  }, [])

  return (
    <BrowserRouter>
    {props.auth ? 
    <div className="App">
      
      <Header/>
      {props.backdropState && <Backdrop/>}
      <Routes>
        <Route path='/' exact element={<PagesContainer/>}/>
        <Route path='/details/:type/:id' exact element={<Detailspage/>}/>
        <Route path='/details/:type/:id/:season' exact element={<Detailspage/>}/>
        <Route path='/popular' element={<Popular/>}/>
        <Route path='/watchlist' element={<Watchlist/>}/>
        <Route path='/genre' element={<Genre/>}/>
      </Routes>
      <Footer/>
    </div>
     : <button onClick={props.loadData}>Load Data </button>}
    </BrowserRouter>
  );
}

const mapStateToProps = state => {
  return {
    auth:state.auth.authenticated,
    backdropState:state.user.backdrop
  }
}

const mapDispatchToProps = dispatch => {
    return {
      loadTrending: () => dispatch(actions.getTrending()),
      loadPopular: (num) => dispatch(actions.getPopularMovie(num)),
      loadPopularTv: (num) => dispatch(actions.getPopularTv(num)),
      loadLatestMovie: () => dispatch(actions.getLatestMovie()),
      loadLatestTv:() => dispatch(actions.getLatestTv()),
      userinfo: () => dispatch(actions.getCountry()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
