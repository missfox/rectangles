import React, { PropTypes } from 'react';

const propTypes = {
  text: PropTypes.string.isRequired,
  inputId: PropTypes.string.isRequired,
  className: PropTypes.string,
};

const defaultProps = {
  className: 'label',
};

const Label = (props) => {
  const { text, className, inputId } = props;
  return <label className={className} htmlFor={inputId}>{text}</label>;
};

Label.propTypes = propTypes;
Label.defaultProps = defaultProps;

export default Label;
