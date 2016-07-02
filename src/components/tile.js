import React, { Component } from 'react';
import Autocomplete from './autocomplete';
import DeleteButton from './delete-button';

export default class Tile extends Component {

  static propTypes = {
    city: React.PropTypes.shape({
      name: React.PropTypes.string,
      temperature: React.PropTypes.number,
      updated: React.PropTypes.number,
    }),

    onDelete: React.PropTypes.func,
    adding: React.PropTypes.bool,
    loading: React.PropTypes.bool,
  }

  renderCity() {
    const width = this.props.width - 40;
    let style = {
      temp: {
        fontSize: ~~(width/5),
        fontWeight: 400,
        lineHeight: 1.5,
        color: '#212121',
      },
      city: {
        color: '#727272',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        fontSize: ~~(width / 13),
        lineHeight: 1.2,
      },
    };
    
    // extracting city and region names. Everything before a comma is a city name.
    let city   = this.props.city.name.split(',').slice(0, 1).join();

    return (
      <div>
        
        <div style={style.city}>
          {city}
        </div>

        <div style={style.temp}>
          {this.props.city.temperature > 0 ? '+' : ''}
          {this.props.city.temperature}
        </div>

      </div>
    );
  }

  renderLoading() {
    const {
      text,
    } = this.props;
    
    const style = {
      color: '#B6B6B6',
    };

    return (
      <div style={style}>
        {text}
      </div>
    );
  }

  renderAutocomplete() {
    const {
      items,
      onSelect,
      onChange,
    } = this.props;

    return (
      <Autocomplete
        items    = {items}
        onSelect = {onSelect}
        onChange = {onChange}
      />
    );
  }

  renderContent() {
    const {
      loading,
      adding,
    } = this.props;

    if (loading) {
      return this.renderLoading();
    } else if (adding) {
      return this.renderAutocomplete();
    }
    return this.renderCity();
  }

  render() {
    const {
      onDelete,
      city,
      width,
    } = this.props;

    const w = width - 40;

    let style = {
      root: {
        border: `1px solid rgba(0, 0, 0, .06)`,
        boxSizing: 'border-box',
        padding: 20,
        position: 'relative',
        justifyContent: 'center',
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: w,
        maxWidth: w,
        width: w,
        margin: 20,
        backgroundColor: 'white',
        boxShadow: '0 3px 10px rgba(0,0,0,0.23),0 3px 10px rgba(0,0,0,0.16)',
        borderRadius: 2,
      },
      content: {
        textAlign: 'center',
      },
    };

    let delBtn = null;
    if (typeof onDelete === 'function') {
      delBtn = <DeleteButton onDelete={onDelete} />;
    }

    return (
      <div
        style = {style.root}
        onMouseEnter = {this.onRootHover}
        onMouseLeave = {this.offRootHover}
      >
        <div style={style.content}>
          { this.renderContent() }
        </div>

        {delBtn}

      </div>
    );
  }
};