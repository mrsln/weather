import React, {Component} from 'react';

export default class Select extends Component {

  static propTypes = {
    highlighted: React.PropTypes.number,
    onHighlight: React.PropTypes.func,
    onSelect:    React.PropTypes.func,
    selected:    React.PropTypes.number,
  }
  
  render() {
    if (!this.props.children || !this.props.children.length) return null;

    let style = {
      root: {
        position:        'absolute',
        width:           '100%',
        overflow:        'hidden',
        textOverflow:    'ellipsis',
        whiteSpace:      'nowrap',
        textAlign:       'left',

        borderRadius: '3px',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
        background: 'rgba(255, 255, 255, 1)',
        padding: '2px 2px',
        cursor: 'pointer',
      },
      highlighted: {
        color: 'white',
        background: 'hsl(200, 50%, 50%)',
        cursor: 'default',
      },
    };

    let items = this.props.children.map( (item, i) => {
      let self = this;
      let props = {
        onMouseEnter: function(i) {
          return function() {
            self.props.onHighlight(i);
          };
        }(i),
        onClick: function(i) {
          return function() {
            self.props.onSelect(i);
          };
        }(i),
        key: 'selectrow' + i,
      };
      if (i === this.props.highlighted) {
        props.style = style.highlighted;
      }
      return React.cloneElement(item, props);
    });

    return (
      <div style={style.root}>
        {items}
      </div>
    );
  }
  
}