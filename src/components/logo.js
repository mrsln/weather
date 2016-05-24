import React, {Component} from 'react';

export default class Button extends Component {
  render() {
    let style = {
      root: {
        display: 'flex',
        marginRight: 50,
        fontSize: 56,
        fontWeight: 400,
        lineHeight: '64px',
      }
    };

    return (
      <h1 style={style.root}>Weather</h1>
    );
  }
}