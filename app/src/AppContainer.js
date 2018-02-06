import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import {  Link } from 'react-router-dom';
import { Route, Switch } from 'react-router'

import Header from "./components/Header";
import Index from './pages/Index';

const ConnectedSwitch = connect(state => ({
  location: state.location
}))(Switch);

export default class AppContainer extends Component {
	composeRoute(Page, props){
		return(
			<div>
				<Header {...props} />
				<Page {...props} />
			</div>
		);
	}
	renderPage(Page, props){
		return this.composeRoute(Page, {...props, ...this.props})
	}
	render() {
		return (
			<div>
				<ConnectedSwitch>
					<Route exact path="/"                render={ (props)=> this.renderPage(Index,      props) }/>
				</ConnectedSwitch>
			</div>
		);
	}
}
