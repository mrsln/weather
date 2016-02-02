import React, {Component} from 'react';

export default class Header extends Component {
  render() {
    const style = {
      height: 50,
      padding: 5,
      margin: 5,
      borderBottom: '2px solid lightgray',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
    };

    return (
      <div style={style}> {this.props.children} </div>
    );
  }
}