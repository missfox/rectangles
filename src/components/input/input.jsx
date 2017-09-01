import React from 'react';

export const Input = (props) => {
  const { type = 'text', id, name, className, onChange } = props;

  return (
      <input type={type} id={id} name={name} className={className} onChange={onChange}/>
  );
};
