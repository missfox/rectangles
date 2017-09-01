import React, { Component } from 'react';

export class App extends Component {
  constructor() {
    super();
  }

  render() {
    return <div className="app">{this.props.children}</div>;
  }
}
