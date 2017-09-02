import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.element.isRequired,
};

const App = ({ children }) => <div className="app">{children}</div>;

App.propTypes = propTypes;

export default App;
