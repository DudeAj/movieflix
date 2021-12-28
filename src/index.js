import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {createStore,combineReducers, applyMiddleware, compose} from 'redux';


import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import MovieReducer from './store/reducers/series';
import AuthReducer from './store/reducers/authentication';
import UserReducer from './store/reducers/user';
import watchProviderReducer from './store/reducers/provider';
import itemReducer from './store/reducers/item';

const rootReducer = combineReducers({
  auth: AuthReducer,
  movie: MovieReducer,
  user: UserReducer,
  provider:watchProviderReducer,
  item:itemReducer
})

const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
  document.getElementById('root')
);

reportWebVitals();
