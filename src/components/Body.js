import React, {Component} from 'react';

export default class Body extends Component {
  render() {
    const style = {
      display: 'flex',
      width: '100%',
      height: 'calc(100% - 51px)', // FIX: this hackery must be fixed
      position: 'fixed',
    };

    return (
      <div style={style}> {this.props.children} </div>
    );
  }
}