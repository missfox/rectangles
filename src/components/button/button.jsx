import React from 'react';

export const Button = (props) => {
  const { type = 'submit', text, className, onClick } = props;

  return (
    <button type={type} className={className} onClick={onClick}>{text}</button>
  );
};
