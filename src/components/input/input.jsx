import React from 'react';
import PropTypes from 'prop-types';

const defaultOnChange = () => console.warn('Input onChange is not defined');

const propTypes = {
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

const defaultProps = {
  type: 'text',
  className: 'input',
  onChange: defaultOnChange,
};

const Input = (props) => {
  const { type = 'text', id, name, className, onChange } = props;

  return (
    <input type={type} id={id} name={name} className={className} onChange={onChange} />
  );
};

Input.propTypes = propTypes;

Input.defaultProps = defaultProps;

export default Input;
