import React, { Component } from 'react';

export default class Tiles extends Component {
  render() {
    const tiles = this.props.tiles.map((tile) => (<div>{tile.city}</div>));
    return (
      <div>
        {tiles}
      </div>
    );
  }
}