"use strict";

import React, {Component} from 'react';

export default class Button extends Component {
  render() {
    let style = {
      root: {
        display: 'flex',
        marginRight: 50,
      }
    };

    return (
      <h1 style={style.root}>Weather</h1>
    );
  }
}