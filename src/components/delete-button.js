import React from 'react';
import Hoverable from './hoverable';

function DeleteButton({ onDelete, isHovered }) {
  const style = {
    padding: 20,
    cursor: 'pointer',
    position: 'absolute',
    right: 5,
    top: 5,
    display: 'flex',
    backgroundColor: isHovered ? 'rgba(0,0,0, .05)' : 'transparent',
    color: '#727272',
    borderRadius: '50%',
    lineHeight: 1,
  };
  return (
      <span
          style = {style}
          onClick = {onDelete}
      >
        ×
      </span>
  );
};

export default Hoverable(DeleteButton);