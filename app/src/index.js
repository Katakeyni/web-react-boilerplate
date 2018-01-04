import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/styles/index.scss';

import { connect, Provider } from 'react-redux';

import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';

import { createStore, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';


import Index from './pages/Index';
import AppContainer from "./AppContainer";

const history = createHistory();

const store = createStore(
  routerReducer,
  applyMiddleware(routerMiddleware(history)),
);


const mapStateToProps = state => ({
  location: state.location,
})

const mapDispatchToProps = (dispatch)=>{
	return {
		onNewCommandeClick: ()=>{
			dispatch(openCommandeForm())
		}
	}
}

const App = connect()(AppContainer)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
    	<App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('react-app'));


// ReactDOM.render(

//   <Index />,
//   document.getElementById('react-app')
// );
