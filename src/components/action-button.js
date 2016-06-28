import React from 'react';
import Hoverable from './hoverable';

export function ActionButton({ mode, onClick, isHovered }) {
  const size = 56;
  const style = {
    root: {
      width: size,
      height: size,
      borderRadius: '50%',
      backgroundColor: '#FF5722',
      boxShadow: '0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28)',
      fontSize: 32,
      lineHeight: '52px',
      fontWeight: 300,
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      cursor: 'pointer',
      WebkitUserSelect: 'none',
      transition: 'all .1s',
    },
  };
  
  if (mode === 'CANCEL') style.root.transform = 'rotate(45deg)';
  if (isHovered) style.root.boxShadow = '0 0 6px rgba(0,0,0,.16),0 6px 12px rgba(0,0,0,.32)';

  return (
    <div style={style.root} onClick={onClick}>
      +
    </div>
  );
}

export default Hoverable(ActionButton);