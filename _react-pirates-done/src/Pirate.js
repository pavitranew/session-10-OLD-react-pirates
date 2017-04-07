import React, { Component } from 'react';

class Pirate extends React.Component {

	render(){
		const {details} = this.props;
		return (
			<li>
			<h4>{details.name}</h4>
			<p>{details.weapon}</p>
			<p>{details.vessel}</p>
			</li>
			)
	}
}

export default Pirate; 