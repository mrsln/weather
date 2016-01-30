// a component for adding a new city

import React, { Component } from 'react';
import Autocomplete         from './autocomplete';

export default class AddCity extends Component {

  static propTypes = {
    items: React.PropTypes.arrayOf(React.PropTypes.string),
    onSelect: React.PropTypes.func,
    onChange: React.PropTypes.func,
  }

  render() {
    let styles = {
      select: {
        position: 'fixed',
        zIndex: 1,
      },
    };

    return (
      <div style={styles.select}>
        <Autocomplete {...this.props} />
      </div>
    );
  }
}