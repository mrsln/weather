import React, { Component } from 'react';
import Tile from './Tile';

export default class Tiles extends Component {
  render() {
    const tiles = this.props.cities.map( city => <Tile city={city}/> );
    return (
      <div>
        {tiles}
      </div>
    );
  }
}