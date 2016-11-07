import React, { Component } from 'react';
import Autocomplete from './autocomplete';
import DeleteButton from './delete-button';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';

const cardSource = {
  beginDrag(props) {
    return {
      i: props.i
    };
  },
  isDragging(props, monitor) {
    return monitor.getItem().i === props.i;
  },
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().i;
    const hoverIndex = props.i;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }
    
    monitor.getItem().i = hoverIndex;
    props.moveTile(dragIndex, hoverIndex);
  }
};

@DropTarget('TILE', cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource('TILE', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class Tile extends Component {
  
  state = {
    hasRendered: false,
  };

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

  componentDidMount() {
    window.requestAnimationFrame(() => {
      this.setState({ hasRendered: true });
    });
  }

  onDelete = () => {
    this.setState({ hasRendered: false }, () => {
      setTimeout(() => {
        this.props.onDelete();
      }, 300);
    });
  };

  render() {
    const {
      onDelete,
      city,
      width,
      isDragging,
      connectDragSource,
      connectDropTarget,
      i,
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
        WebkitUserSelect: 'none',
        opacity: isDragging ? 0 : 1,
        transition: 'opacity .3s',
      },
      content: {
        textAlign: 'center',
      },
    };

    let delBtn = null;
    if (typeof onDelete === 'function') {
      delBtn = <DeleteButton onDelete={ this.onDelete } />;
    }

    return connectDragSource(connectDropTarget(
      <div
        style = {{
          ...style.root,
          opacity: this.state.hasRendered ? 1 : 0,
        }}
        onMouseEnter = {this.onRootHover}
        onMouseLeave = {this.offRootHover}
      >
        <div style={style.content}>
          { this.renderContent() }
        </div>

        {delBtn}

      </div>
    ));
  }
};