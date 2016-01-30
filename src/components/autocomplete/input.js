import React, {Component} from 'react';

export default class Input extends Component {

  static propTypes = {
    onChange: React.PropTypes.func,
    onUp: React.PropTypes.func,
    onDown: React.PropTypes.func,
    onEnter: React.PropTypes.func,
    value:    React.PropTypes.string,
  }

  onKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      this.props.onUp();
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      this.props.onDown();
      e.preventDefault();
    } else if (e.key === 'Enter') {
      this.props.onEnter();
    }
  }
  
  render() {
    return (
      <div>
        <input
          onChange  = {this.props.onChange}
          onKeyDown = {this.onKeyDown}
          autoFocus = {true}
        />
      </div>
    );
  }
  
}