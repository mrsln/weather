// stateless (dumb) autocomplete component (or at least a try)

import React, { Component } from 'react';
import Input from './input';
import Select from './select';

export default class Autocomplete extends Component {

  static propTypes = {
    // the value of the input
    inputValue: React.PropTypes.string.isRequired,

    // a callback for the input
    onInputChange: React.PropTypes.func.isRequired,

    // the highlighted item
    highlighted: React.PropTypes.number.isRequired,

    // a callback for a new highlighted item
    onHighlight: React.PropTypes.func.isRequired,

    // a callback for when an item is selected
    onSelect: React.PropTypes.func.isRequired,

    // the selected item
    selected: React.PropTypes.number.isRequired,

    // the items. Renders items in divs if there's ones, otherwise renders chidlren
    items: React.PropTypes.arrayOf(React.PropTypes.string),
    children: React.PropTypes.arrayOf(React.PropTypes.element),
  }

  onUp = () => {
    this.props.onHighlight(this.props.highlighted - 1);
  }

  onDown = () => {
    this.props.onHighlight(this.props.highlighted + 1);
  }

  onEnter = () => {
    this.props.onSelect(this.props.highlighted);
  }

  render() {
    let items = this.props.items ? this.props.items.map(item => <div key={`auto${item}`}>{item}</div>) : this.props.children;

    return (
      <div>
        <Input
          onChange = {this.props.onInputChange}
          value    = {this.props.inputValue}
          onUp     = {this.onUp}
          onDown   = {this.onDown}
          onEnter  = {this.onEnter}
        />

        <Select
          highlighted = {this.props.highlighted}
          onHighlight = {this.props.onHighlight}
          onSelect    = {this.props.onSelect}
          selected    = {this.props.selected}
        >
          {items}
        </Select>
      </div>
    );
  }
}
