import React, { Component } from 'react';
import Tile from './Tile';

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
      <div>
        {tiles}
      </div>
    );
  }
}