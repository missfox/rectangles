import React from 'react';
import { Label } from '../label/label';
import { Input } from '../input/input';

export const Field = (props) => {
  const { type = 'text', id, name, label, className, labelClassName, onChange } = props;

  return (
    <div className="field">
      <Label text={label} inputId={id} className={labelClassName} />
      <Input type={type} id={id} name={name} className={className} onChange={onChange} />
    </div>
  );
};
