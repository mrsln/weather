import React, { Component } from 'react';


export default function Hoverable(Comp) {
  
  class Hoverable extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        isHovered: false,
      };

      this.onMouseEnter = this.onMouseEnter.bind(this);
      this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    onMouseEnter() {
      this.setState({ isHovered: true });
    }

    onMouseLeave() {
      this.setState({ isHovered: false });
    }

    render() {
      const style = {
        display: 'flex',
        flexGrow: 1,
      };
      return (
        <div
          onMouseEnter = {this.onMouseEnter}
          onMouseLeave = {this.onMouseLeave}
          style = {style}
        >
          <Comp { ...this.props } isHovered={this.state.isHovered} />
        </div>
      );
    }
  }

  return Hoverable;
}