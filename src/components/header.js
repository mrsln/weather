import React, {Component} from 'react';

export default class Header extends Component {
  render() {
    const style = {
      padding: 5,
      borderBottom: '1px solid rgba(0, 0, 0, .06)',
      alignItems: 'center',
      textAlign: 'center',
      display: 'flex',
    };

    return (
      <div style={style}> {this.props.children} </div>
    );
  }
}