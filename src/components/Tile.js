import React, { Component } from 'react';

const style = {
  root: {
    display: 'flex',
    width: '100%',
    maxWidth: 500,
    height: '100%',
    border: 'solid',
    borderRadius: 5,
  },
};

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
        position: 'absolute',
        right: 5,
        top: 5,
      },
      root: {
        border: '1px solid gray',
        borderRadius: 5,
        margin: 5,
        padding: 20,
        position: 'relative',
        verticalAlign: 'middle',
        display: 'flex',
        flexGrow: 1,
        flexBasis: 150,
      }
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
        >X</span>
      );
    }

		return (
			<div style={style.root}>
				
        {this.props.city.name}: {this.props.city.temperature}

        {delBtn}

			</div>
		);
	}
}