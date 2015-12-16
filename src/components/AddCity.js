// a component for adding a new city

import React, { Component } from 'react';

export default class AddCity extends Component {
	render() {
		return (
			<div>
				<input ref='cityId' />
				<button onClick = { e => this.props.onAdd(this.refs.cityId.value) } >Добавить</button>
			</div>
		);
	}
}