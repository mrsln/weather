import React, { Component } from 'react';
import Tiles from './Tiles';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Weather</h1>
        <Tiles tiles={this.props.tiles} />
      </div>
    );
  }
}