import React from 'react';

const Select = (props) => {
  return (
    <select
      ref={props.reference}
      name={props.name}
      id={props.id}
      className={props.className}
    >
      <option key='#' value='#'>
        {props.defaultOption || 'Choose an option'}
      </option>
      {props.options.map((option) => (
        <option key={option} value={option.toLowerCase()}>
          {option.toLowerCase()}
        </option>
      ))}
    </select>
  );
};

export default Select;
