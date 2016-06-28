import React, { Component } from 'react';
import Autocomplete         from './autocomplete';
import Hoverable from './hoverable';

export class Tile extends Component {

  static propTypes = {
    city: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      temperature: React.PropTypes.number.isRequired,
      updated: React.PropTypes.number,
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
        fontSize: 56,
        fontWeight: 400,
        lineHeight: '64px',
        color: '#212121',
      },
      city: {
        color: '#727272',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        fontSize: 24,
        lineHeight: '26px',
      },
      region: {
        color: '#B6B6B6',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        fontSize: 14,
        lineHeight: '23px',
      },
    };
    
    // extracting city and region names. Everything before a comma is a city name.
    let city   = this.props.city.name.split(',').slice(0, 1).join();
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

  renderAutocomplete() {
    return (
      <Autocomplete
        items    = {this.props.items}
        onSelect = {this.props.onSelect}
        onChange = {this.props.onChange}
      />
    );
  }

  render() {
    const {
      adding,
      onDelete,
      city,
      width,
      isHovered,
    } = this.props;
    let editing = true;// this.state.tileHovered || this.props.editing;

    let style = {
      minus: {
        padding: 20,
        cursor: 'pointer',
        position: 'absolute',
        right: 5,
        top: 5,
        display: editing ? 'flex' : 'none',
        backgroundColor: this.state.minusHovered ? 'rgba(0,0,0,0.1)' : 'transparent',
        color: '#727272',
        borderRadius: '50%',
        lineHeight: 1,
      },
      root: {
        border: `1px solid rgba(0, 0, 0, ${editing ? '0.06' : '0'})`,
        boxSizing: 'border-box',
        padding: 20,
        position: 'relative',
        justifyContent: 'center',
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: width,
        zIndex: 1,
        // marginTop: -1,
        margin: 20,
        color: (!adding && city.updated > 0 ? 'inherit' : 'gray'),
        backgroundColor: 'white',
        boxShadow: '0 3px 10px rgba(0,0,0,0.23),0 3px 10px rgba(0,0,0,0.16)',
        borderRadius: 2,
      },
      content: {
        textAlign: 'center',
      },
    };

    if (isHovered) {
      style.root.boxShadow = '0 5px 15px rgba(0,0,0,0.25),0 5px 15px rgba(0,0,0,0.18)';
    }

    let delBtn = null;
    if (typeof onDelete === 'function') {
      delBtn = (
        <span
          style        = {style.minus}
          onMouseEnter = {this.onMinusHover}
          onMouseLeave = {this.offMinusHover}
          onClick      = {onDelete}
        >×</span>
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
            // TODO: must be 2 different components
            adding ? this.renderAutocomplete() : this.renderCity()
          }
        </div>

        {delBtn}

      </div>
    );
  }
};

export default Hoverable(Tile);