import React, { PropTypes } from 'react';

const propTypes = {
  text: PropTypes.string.isRequired,
};

const Heading = ({ text }) => <h1 className="heading">{text}</h1>;

Heading.propTypes = propTypes;

export default Heading;
