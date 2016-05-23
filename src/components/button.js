"use strict";

import React, {Component} from 'react';

export default class Button extends Component {
  render() {
    let style = {
      root: {
        padding: 5,
        border: '1px solid lightgray',
        cursor: 'pointer',
        display: 'flex',
        margin: '0 5px',
        color: '#212121',
        borderRadius: '2dp',
      }
    };

    return (
      <div onClick={this.props.onClick} style={style.root}>
        {this.props.children}
      </div>
    );
  }
}