import React from 'react';
import ActionButton from './action-button';

export default function FloatingActionButton(props) {
  const style = {
    position: 'fixed',
    bottom: 23,
    right: 12,
    zIndex: 5,
  };

  return (
    <div style={style}>
        <ActionButton {...props} />
    </div>
  )
};