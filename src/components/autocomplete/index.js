// this is a hackery statefull component for a 
// use ./autocomplete.js if you need the stateless component

import React, { Component } from 'react';
import DumbAutocomplete from './autocomplete';

export default class Autocomplete extends Component {

  static propTypes = {
    items:    React.PropTypes.arrayOf(React.PropTypes.string),
    onSelect: React.PropTypes.func,
    onChange: React.PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      inputValue:  '',
      highlighted: -1,
      selected:    0,
    };
  }

  onHighlight = (highlighted) => {
    if (highlighted < 0) {
      highlighted = this.props.items.length - 1;
    } else if (highlighted > this.props.items.length - 1) {
      highlighted = 0;
    }
    this.setState({highlighted});
  }

  render() {
    return (
      <div>
        <DumbAutocomplete
          items         = {this.props.items}
          
          inputValue    = {this.state.inputValue}
          onInputChange = { (e) => this.setState({inputValue: e.target.value}, () => this.props.onChange(e.target.value)) }
          
          highlighted   = {this.state.highlighted}
          onHighlight   = {this.onHighlight} 
          
          selected      = {this.state.selected}
          onSelect      = { (selected) => this.setState({selected}, () => this.props.onSelect(selected)) }
        />
      </div>
    );
  }
}