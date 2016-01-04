// a component for adding a new city

import React, { Component } from 'react';
import Autocomplete         from 'react-autocomplete';


export default class AddCity extends Component {

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
            <div style={{position: 'fixed'}}>
                <Autocomplete
                    items      = {this.props.cityList}
                    getItemValue={item => item.Description}
                    onChange   = {this.props.onInputChange}
                    onSelect   = {this.props.onInputSelect}
                    renderItem = { (item, isHighlighted) =>
                        <div
                          style = {isHighlighted ? styles.highlightedItem : styles.item}
                          key   = {'auto' + item.PlaceId}
                        >{item.Description}</div>
                    }
                />
            </div>
        );
    }
}