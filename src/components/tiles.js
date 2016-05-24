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
    const {
      cities,
      onDelete,
      editing,
      adding,
      stopAdding,
      items,
      onSelect,
      onChange,
      width,
    } = this.props;
    
    const tiles = cities.map(
      (city, i) =>
        <Tile
          key      = {'tile_' + i}
          city     = {city}
          onDelete = {onDelete.bind(this, i)}
          editing  = {editing}
          width    = {width}
        />
    );
    
    return (
      <div style={style.root}>
        { tiles }
        {
          adding ?
            <Tile
              key      = 'adding'
              adding   = {true}
              onDelete = {stopAdding}

              items    = {items}
              onSelect = {onSelect}
              onChange = {onChange}
            />
            : null
        }
      </div>
    );
  }
}