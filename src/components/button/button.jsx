import React from 'react';
import PropTypes from 'prop-types';

const defaultOnClick = () => console.warn('Button onClick is not defined');

const propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

const defaultProps = {
  type: 'submit',
  text: '',
  className: 'button',
  onClick: defaultOnClick,
};

const Button = (props) => {
  const { type = 'submit', text, className, onClick } = props;

  return (
    <button type={type} className={className} onClick={onClick}>{text}</button>
  );
};

Button.propTypes = propTypes;

Button.defaultProps = defaultProps;

export default Button;
