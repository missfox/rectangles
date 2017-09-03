import React from 'react';
import Heading from '../text/heading';
import CreateRectangleForm from '../forms/create-rectangle-form';
import Viewport from '../viewport/viewport';

class RectangleCreator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      viewportWidth: 0,
    };

    this.handleUpdate = this.handleUpdate.bind(this);
    this.getViewportWidth = this.getViewportWidth.bind(this);
  }

  getViewportWidth(width) {
    this.setState({
      viewportWidth: width,
    });
  }

  handleUpdate(item) {
    this.setState({
      data: item,
    });
  }

  render() {
    return (
      <div className="rectangles-creator">
        <div className="rectangles-creator__set-settings">
          <Heading text="Create your own rectangles" />
          <CreateRectangleForm
            onUpdate={this.handleUpdate}
            viewportWidth={this.state.viewportWidth}
          />
        </div>
        <Viewport
          data={this.state.data}
          onGetWidth={this.getViewportWidth}
        />
      </div>
    );
  }
}

export default RectangleCreator;
