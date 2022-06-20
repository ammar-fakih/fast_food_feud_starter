import * as React from 'react';
import './Chip.css';

export function Chip({ label = '', isActive = false, type, handleClick }) {
  const buttonClassName = `chip ${isActive ? 'active' : ''}`;

  return (
    <button
      className={buttonClassName}
      onClick={() => {
        handleClick(type, label);
      }}>
      <p className="label">{label}</p>
      <span className="close" role="button">{`X`}</span>
    </button>
  );
}

export default Chip;
