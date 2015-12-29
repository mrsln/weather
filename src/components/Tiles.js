import React, { Component } from 'react';
import Tile from './Tile';

const style = {
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
};

export default class Tiles extends Component {
  
  static propTypes = {
    onDelete: React.PropTypes.func,
  }

  render() {
    const tiles = this.props.cities.map(
      (city, i) =>
        <Tile key={'tile_' + i} city={city} onDelete={this.props.onDelete.bind(this, i)} />
    );
    
    return (
      <div style={style.root}>
        {tiles}
      </div>
    );
  }
}