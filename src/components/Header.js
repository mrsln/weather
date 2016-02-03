import React, {Component} from 'react';

export default class Header extends Component {
  render() {
    const style = {
      height: 50,
      padding: 5,
      borderBottom: '1px solid rgba(0,0,0,.06)',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      zIndex: 5,
      boxSizing: 'border-box',
    };

    return (
      <div style={style}> {this.props.children} </div>
    );
  }
}