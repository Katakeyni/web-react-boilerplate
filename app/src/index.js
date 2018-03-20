import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';


import 'assets/styles/index.scss';

import Index from './pages/Index';
import AppContainer from "./AppContainer";
import store from "./store";

const history = createHistory();



const mapStateToProps = state => ({
  location: state.location,
  ...state
})


const App = connect(mapStateToProps)(AppContainer)

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
