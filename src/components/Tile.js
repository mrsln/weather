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
        justifyContent: 'center',
        display: 'flex',
        flexGrow: 1,
        flexBasis: 150,
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 200,
      },
      temp: {
        fontSize: '3em',
      },
      city: {
        fontSize: '2em',
      },
      content: {
        textAlign: 'center',
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
        >X</span>
      );
    }

		return (
			<div style={style.root}>
				<div style={style.content}>
          <div style={style.temp}>
            {this.props.city.temperature}
          </div>

          <div style={style.city}>
            {this.props.city.name}
          </div>
        </div>

        {delBtn}

			</div>
		);
	}
}