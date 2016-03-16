import React, { Component } from 'react';
import Autocomplete         from './autocomplete';

export default class Tile extends Component {

  static propTypes = {
    city: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      temperature: React.PropTypes.number.isRequired
    }),

    onDelete: React.PropTypes.func,
    adding: React.PropTypes.bool,
    editing: React.PropTypes.bool,
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

  renderCity() {
    let style = {
      temp: {
        fontSize: '3em',
      },
      city: {
        fontSize: '2em',
      },
      region: {
        color: 'gray',
      },
    };
    let city = this.props.city.name.split(',').slice(0, 1).join();
    let region = this.props.city.name.split(',').slice(1).join();
    return (
      <div>
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
    );
  }

  render() {
    let editing = this.state.tileHovered || this.props.editing;
    let style = {
      minus: {
        padding: '0 5px',
        cursor: 'pointer',
        position: 'absolute',
        right: 5,
        top: 5,
        display: editing ? 'block' : 'none',
        backgroundColor: this.state.minusHovered ? 'lightgray' : 'transparent',
      },
      root: {
        border: editing ? '1px solid rgba(0,0,0,.06)' : 'none',
        boxSizing: 'border-box',
        padding: 20,
        position: 'relative',
        justifyContent: 'center',
        display: 'flex',
        flexGrow: 1,
        flexBasis: 150,
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 200,
        zIndex: 1,
        marginTop: -1,
      },
      content: {
        textAlign: 'center',
      },
    };

    let delBtn = null;
    if (typeof this.props.onDelete === 'function') {
      delBtn = (
        <span
          style        = {style.minus}
          onMouseEnter = {this.onMinusHover}
          onMouseLeave = {this.offMinusHover}
          onClick      = {this.props.onDelete}
        >X</span>
      );
    }

    return (
      <div
        style = {style.root}
        onMouseEnter = {this.onRootHover}
        onMouseLeave = {this.offRootHover}
      >
        <div style={style.content}>
          {
            this.props.adding ?
              <Autocomplete
                items    = {this.props.items}
                onSelect = {this.props.onSelect}
                onChange = {this.props.onChange}
              />
              : this.renderCity()
          }
        </div>

        {delBtn}

      </div>
    );
  }
}