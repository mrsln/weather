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
        float: 'left',
      },
      slogan: {
        fontWeight: 300,
        fontSize: 16,
        color: '#c8e6c9',
        float: 'right',
        display: 'flex',
        height: 40,
        alignItems: 'flex-end',
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