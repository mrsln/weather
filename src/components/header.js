import React, {Component} from 'react';

export default class Header extends Component {
  render() {
    const style = {
      padding: 5,
      borderBottom: '1px solid rgba(0, 0, 0, .06)',
      alignItems: 'center',
      textAlign: 'center',
      display: 'flex',
      backgroundColor: '#4caf50',
      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
      color: 'white',
      zIndex: 5,
    };

    return (
      <div style={style}> {this.props.children} </div>
    );
  }
}