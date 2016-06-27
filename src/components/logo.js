import React, {Component} from 'react';

export default class Button extends Component {
  render() {
    let style = {
      root: {
        fontFamily: '"Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif',
        textAlign: 'left',
      },
      name: {
        fontSize: 36,
        fontWeight: 300,
        // lineHeight: '64px',
      },
      slogan: {
        fontWeight: 300,
        fontSize: 16,
        // lineHeight: '1.5',
        color: '#c8e6c9',
      },
    };

    return (
      <div style={style.root}>
        <h1 style={style.name}>Weather</h1>
        <h2 style={style.slogan}>for multiple cities</h2>
      </div>
    );
  }
}