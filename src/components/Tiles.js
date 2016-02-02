import React, { Component } from 'react';
import Tile from './tile';

const style = {
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexWrap: 'wrap',
  },
};

export default class Tiles extends Component {
  
  static propTypes = {
    onDelete:   React.PropTypes.func,
    adding:     React.PropTypes.bool,
    editing:    React.PropTypes.bool,
    cities:     React.PropTypes.array,

    stopAdding: React.PropTypes.func,
    items: React.PropTypes.arrayOf(React.PropTypes.string),
    onSelect: React.PropTypes.func,
    onChange: React.PropTypes.func,
  }

  render() {
    const tiles = this.props.cities.map(
      (city, i) =>
        <Tile
          key      = {'tile_' + i}
          city     = {city}
          onDelete = {this.props.onDelete.bind(this, i)}
          editing  = {this.props.editing}
        />
    );
    
    return (
      <div style={style.root}>
        {tiles}
        {
          this.props.adding ?
            <Tile
              key      = 'adding'
              adding   = {true}
              onDelete = {this.props.stopAdding}

              items    = {this.props.items}
              onSelect = {this.props.onSelect}
              onChange = {this.props.onChange}
            />
            : null
        }
      </div>
    );
  }
}