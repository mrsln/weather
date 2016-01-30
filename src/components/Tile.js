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
      tileHovered: false,
    };
  }

  onMinusHover = () => {
    this.setState({minusHovered: true});
  }

  offMinusHover = () => {
    this.setState({minusHovered: false});
  }

  onRootHover = () => {
    this.setState({tileHovered: true});
  }

  offRootHover = () => {
    this.setState({tileHovered: false});
  }

	render() {
    
    let style = {
      minus: {
        padding: '0 5px',
        cursor: 'pointer',
        position: 'absolute',
        right: 5,
        top: 5,
        display: this.state.tileHovered ? 'block' : 'none',
      },
      root: {
        border: this.state.tileHovered ? '1px solid gray' : 'none',
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
      region: {
        color: 'gray',
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
          onMouseEnter = {this.onMinusHover}
          onMouseLeave = {this.offMinuxHover}
          onClick      = {this.props.onDelete}
        >X</span>
      );
    }

    let city = this.props.city.name.split(',').slice(0, 1).join();
    let region = this.props.city.name.split(',').slice(1).join();

		return (
			<div
          style = {style.root}
          onMouseEnter = {this.onRootHover}
          onMouseLeave = {this.offRootHover}
        >
				<div style={style.content}>
          <div style={style.temp}>
            {this.props.city.temperature > 0 ? '+' : ''}
            {this.props.city.temperature}
          </div>

          <div style={style.city}>
            {city}
          </div>

          <div style={style.region}>
            {region}
          </div>
        </div>

        {delBtn}

			</div>
		);
	}
}