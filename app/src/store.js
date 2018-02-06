import logger from 'redux-logger'
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import { createStore, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();


const store = createStore(
  routerReducer,
  applyMiddleware(routerMiddleware(history), promise(), thunk, logger()),
);

export default store;