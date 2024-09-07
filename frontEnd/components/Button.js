import React from 'react';

const Button = ({ name, click, cssName, btntype }) => {
  return (
    <div>
      <button
        type={btntype}
        onClick={click}
        className={`p14 font-secondary c-btn ${cssName} border-2 `}
      >
        {name}
      </button>
    </div>
  );
};

export default Button;
