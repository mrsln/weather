import React, { Component } from 'react';

export default class Tile extends Component {
	render() {
		return (
			<div>
				{this.props.city.name}: {this.props.city.temperature}
			</div>
		);
	}
}