import React from 'react';
import PropTypes from 'prop-types';
import Label from '../label/label';
import Input from '../input/input';

const defaultOnChange = () => console.warn('Field onChange is not defined');

const propTypes = {
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};
const defaultProps = {
  type: 'text',
  className: 'field',
  labelClassName: 'label',
  onChange: defaultOnChange,
};

const Field = (props) => {
  const { type, id, name, label, className, labelClassName, onChange } = props;

  return (
    <div className="field">
      <Label text={label} inputId={id} className={labelClassName}/>
      <Input type={type} id={id} name={name} className={className} onChange={onChange}/>
    </div>
  );
};

Field.propTypes = propTypes;
Field.defaultProps = defaultProps;

export default Field;
