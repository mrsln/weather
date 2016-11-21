import React, { Component } from 'react';
import Tile from './tile';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import FlipMove from 'react-flip-move';

@DragDropContext(HTML5Backend)
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
      moveTile,
    } = this.props;
    
    const tiles = cities.map(
      (city, i) =>
        <Tile
          key      = {'tile_' + i}
          city     = {city}
          onDelete = {city.adding ? stopAdding : onDelete.bind(this, i)}
          editing  = {editing}
          width    = {width}

          loading  = {city.loading}
          text     = {city.text}

          adding   = {city.adding}
          items    = {items}
          onSelect = {onSelect}
          onChange = {onChange}

          i = {i}
          moveTile = {moveTile}
        />
    );

    const style = {
      root: {
        display: 'flex',
        width: '100%',
        minHeight: '100%',
        flexWrap: 'wrap',
      },
    };
    
    return (
      <div style={ style.root }>
        <FlipMove
          style={ style.root }
          enterAnimation='fade'
          leaveAnimation='fade'
        >
          { tiles }
        </FlipMove>
      </div>
    );
  }
}