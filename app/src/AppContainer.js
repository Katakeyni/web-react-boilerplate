import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import {  Link } from 'react-router-dom';
import { Route, Switch } from 'react-router'

import Index from './pages/Index';

const ConnectedSwitch = connect(state => ({
  location: state.location
}))(Switch);

export default class AppContainer extends Component {
	render() {
		return (
			<div>
				<ConnectedSwitch>
					<Route exact path="/" render={ (props)=> (<Index {...props} {...this.props} />) }/>
				</ConnectedSwitch>
			</div>
		);
	}
}
