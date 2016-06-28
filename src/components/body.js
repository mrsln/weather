import React, {Component} from 'react';

export default class Body extends Component {
  render() {
    const style = {
      flex: 1,
      display: 'flex',
      padding: '20px 70px 70px 20px',
      backgroundColor: '#f2f2f2',
    };

    return (
      <div style={style}>
        {this.props.children}
      </div>
    );
  }
}