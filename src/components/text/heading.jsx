import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  text: PropTypes.string.isRequired,
};

const Heading = ({ text }) => <h1 className="heading">{text}</h1>;

Heading.propTypes = propTypes;

export default Heading;
