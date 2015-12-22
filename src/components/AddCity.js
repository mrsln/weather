// a component for adding a new city

import React, { Component } from 'react';
import Autocomplete         from 'react-autocomplete';


export default class AddCity extends Component {

    handleSelectName() {

    }

    render() {
        let styles = {
          item: {
            padding: '2px 6px',
            cursor: 'default'
          },

          highlightedItem: {
            color: 'white',
            background: 'hsl(200, 50%, 50%)',
            padding: '2px 6px',
            cursor: 'default'
          },

          menu: {
            border: 'solid 1px #ccc'
          }
        };
        return (
            <div>
                <Autocomplete
                    items      = {this.props.cityList}
                    getItemValue={item => item.name + ', ' + item.country}
                    onChange   = {this.props.onInputChange}
                    onSelect   = {this.props.onInputSelected}
                    renderItem = { (item, isHighlighted) => (
                        <div
                          style = {isHighlighted ? styles.highlightedItem : styles.item}
                          key   = {'auto' + item.name}
                        >{item.name + ', ' + item.country}</div>
                    )}
                />
            </div>
        );
    }
}