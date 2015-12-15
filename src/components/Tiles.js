import React, { Component } from 'react';
import Tile from './Tile';

export default class Tiles extends Component {
  render() {
    const tiles = this.props.cities.map( (city, i) => <Tile key={'tile_' + i} city={city}/> );
    return (
      <div>
        {tiles}
      </div>
    );
  }
}