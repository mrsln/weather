import React, {Component} from 'react';

export default class Header extends Component {
  render() {
    const style = {
      height: 30,
      margin: 5,
    };

    return (
      <div style={style}> {this.props.children} </div>
    );
  }
}