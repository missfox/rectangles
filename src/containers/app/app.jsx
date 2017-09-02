import React from 'react';
import App from '../../components/app/app';
import RectangleCreator from '../../components/rectangles-creator/rectangles-creator';

export default class AppContainer extends React.Component {
  render() {
    return (
      <App>
        <RectangleCreator />
      </App>
    );
  }
}
