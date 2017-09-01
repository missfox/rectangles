import React from 'react';

export const Label = (props) => {
  const { text, className, inputId } = props;
  return <label className={className} htmlFor={inputId}>{text}</label>;
};
