import * as React from 'react';
import './Chip.css';

export function Chip({ label = '', isActive = false }) {
  const buttonClassName = `chip ${isActive ? 'active' : ''}`;

  return (
    <button className={buttonClassName}>
      <p className="label">{label}</p>
      <span className="close" role="button">{`X`}</span>
    </button>
  );
}

export default Chip;
