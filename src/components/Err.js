// a component for showing the las error

import React, { Component } from 'react';

export default class Err extends Component {
	render() {
		const show = this.props.err && this.props.err.err;
		const style = {
			visibility: show,
			color: 'red',
		};
		return (
			<div style={style}>
				{this.props.err.errMessage}
			</div>
		);
	}
}