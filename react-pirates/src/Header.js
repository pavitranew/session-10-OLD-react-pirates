import React, { Component } from 'react';
import logo from './anchor.svg';

class Header extends Component {
	render() {
		return (
			<div className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<h2>Pirate List</h2>
			</div>
			)
	}
}

export default Header;