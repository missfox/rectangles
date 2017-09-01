import React from 'react';
import { Heading } from '../text/heading';
import { CreateRectangleForm } from '../forms/create-rectangle-form';
import { Viewport } from '../viewport/viewport';

export class RectangleCreator extends React.Component {
  constructor(props) {
    super(props);
    this.onUpdate = this.onUpdate.bind(this);

  }

  onUpdate(data) {
    this.setState(data);
  }

  render() {
    return (
      <div className="rectangles-creator">
        <div className="rectangles-creator__set-settings">
          <Heading text="Create your own rectangles"/>
          <CreateRectangleForm onUpdate={this.onUpdate}/>
        </div>
        <Viewport data={this.state}/>
      </div>
    );
  }
}
