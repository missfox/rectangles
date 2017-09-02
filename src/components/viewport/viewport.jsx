import React from 'react';
import PropTypes from 'prop-types';
import Rectangle from '../rectangle/rectangle';

const propTypes = {
  data: PropTypes.object,
};

const defaultProps = {
  data: {},
};

class Viewport extends React.Component {
  constructor(props) {
    super(props);
    const cachedElements = [];

    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).includes('item')) {
        const item = JSON.parse(localStorage.getItem(localStorage.key(i)));
        cachedElements.push(item);
      }
    }

    this.state = {
      viewportWidth: window.width,
      maxElementCount: 5,
      elements: cachedElements,
    };
  }

  render() {
    const data = this.props.data;
    if (this.state.elements.length <= this.state.maxElementCount && !!data) {
      this.state.elements.push(data);
    }

    const rectangles = this.state.elements.map((item, index) => {
      localStorage.setItem(`item-${index}`, JSON.stringify(item));
      return (<Rectangle
        width={item.width}
        height={item.height}
        left={item.posX}
        top={item.posY}
        key={item.id}
      />);
    });

    return (
      <div className="viewport">
        {rectangles}
      </div>
    );
  }
}

Viewport.propTypes = propTypes;
Viewport.defaultProps = defaultProps;

export default Viewport;
