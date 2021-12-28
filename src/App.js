import React, {useEffect} from 'react';

import './App.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import PagesContainer from './containers/PagesContainer/PagesContainer';
import Detailspage from './pages/DetailsPage/detailspage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionTypes from './store/actionTypes';
import * as actions from './store/actions';
import New from './pages/New/New';
import Popular from './pages/Popular/Popular';
import Watchlist  from './pages/Watchlist/Watchlist'

const App = (props) => {
  
  useEffect(() => {
    const date = new Date();
    const offset = date.getTimezoneOffset();
    
    props.loadTrending()
    props.loadPopular()
    props.loadPopularTv()
    props.loadLatestMovie()
    props.loadLatestTv()
    props.userinfo()
  }, [])

  return (
    <BrowserRouter>
    {props.auth ? 
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' exact element={<PagesContainer/>}/>
        <Route path='/details/:type/:id' exact element={<Detailspage/>}/>
        <Route path='/details/:type/:id/:season' exact element={<Detailspage/>}/>
        <Route path='/new' element={<New/>}/>
        <Route path='/popular' element={<Popular/>}/>
        <Route path='/watchlist' element={<Watchlist/>}/>
      </Routes>
      <Footer/>
    </div>
     : <button onClick={props.loadData}>Load Data </button>}
    </BrowserRouter>
  );
}

const mapStateToProps = state => {
  return {
    auth:state.auth.authenticated
  }
}

const mapDispatchToProps = dispatch => {
    return {
      loadTrending: () => dispatch(actions.getTrending()),
      loadPopular: () => dispatch(actions.getPopularMovie()),
      loadPopularTv: () => dispatch(actions.getPopularTv()),
      loadLatestMovie: () => dispatch(actions.getLatestMovie()),
      loadLatestTv:() => dispatch(actions.getLatestTv()),
      userinfo: () => dispatch(actions.getCountry())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
