import React from 'react';

const Button = (props) => {
  return (
    <button className={props.className} onClick={(para) => callFunction(para)}>
      {props.children}
    </button>
  );
};

export default Button;
