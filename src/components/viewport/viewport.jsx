import React from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'react-dimensions';
import Rectangle from '../rectangle/rectangle';

const propTypes = {
  data: PropTypes.object,
  containerWidth: PropTypes.any,
};

const defaultProps = {
  data: {},
  containerWidth: '',
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
      viewportWidth: this.props.containerWidth,
      maxElementCount: 5,
      elements: cachedElements,
    };
  }

  get allElementsWidth() {
    const elements = this.state.elements;
    const { width } = this.props.data || 0;
    let elementsWidth = 0;
    elements.forEach((item) => {
      elementsWidth += item.width;
    });
    return elementsWidth + width;
  }

  render() {
    const data = this.props.data;
    const calculatedWidth = this.allElementsWidth;
    if (this.state.elements.length < this.state.maxElementCount
      && !!data
      && calculatedWidth <= this.state.viewportWidth) {
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

export default Dimensions()(Viewport);
