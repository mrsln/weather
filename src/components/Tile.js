import React, { Component } from 'react';

export default class Tile extends Component {

  static propTypes = {
    city: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      temperature: React.PropTypes.number.isRequired
    }).isRequired,
    onDelete: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      minusHovered: false, // doesn't feel like a prop
    };
  }

  onHover() {
    this.setState({minusHovered: true});
  }

  offHover() {
    this.setState({minusHovered: false});
  }

	render() {
    
    let style = {
      minus: {
        padding: '0 5px',
        cursor: 'pointer',
      },
    };
    
    if (this.state.minusHovered) {
      style.minus.backgroundColor = 'lightgray';
    }

    let delBtn = null;
    if (typeof this.props.onDelete === 'function') {
      delBtn = (
        <span
          style        = {style.minus}
          onMouseEnter = {this.onHover.bind(this)}
          onMouseLeave = {this.offHover.bind(this)}
          onClick      = {this.props.onDelete}
        >-</span>
      );
    }

		return (
			<div>
        {delBtn}
				{this.props.city.name}: {this.props.city.temperature}
			</div>
		);
	}
}