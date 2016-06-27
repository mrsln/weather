import React from 'react';

export default function ActionButton() {
  const size = 56;
  const style = {
    root: {
      width: size,
      height: size,
      borderRadius: '50%',
      backgroundColor: '#FF5722',
      boxShadow: '0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28)',
      // boxShadow: '0 0 6px rgba(0,0,0,.16),0 6px 12px rgba(0,0,0,.32)',
      fontSize: 32,
      fontWeight: 100,
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      WebkitUserSelect: 'none',
    },
  };

  return (
    <div style={style.root}>
      +
    </div>
  );
}