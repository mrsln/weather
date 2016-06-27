import React, {Component} from 'react';

export default class Body extends Component {
  render() {
    const style = {
      flex: 1,
      display: 'flex',
    };

    return (
      <div style={style}>
        {this.props.children}
      </div>
    );
  }
}