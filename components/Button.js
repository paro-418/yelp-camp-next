import React from 'react';

const Button = (props) => {
  return (
    <button
      className={props.className}
      onClick={(parameter) =>
        props.callFunction ? props.callFunction(parameter) : null
      }
    >
      {props.children}
    </button>
  );
};

export default Button;
