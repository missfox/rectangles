import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'react-dimensions';
import Rectangle from '../rectangle/rectangle';

const defaultOnGetWidth = () => {
  console.warn('Viewport onGetWidth is not defined');
};

const propTypes = {
  data: PropTypes.object,
  containerWidth: PropTypes.any,
  onGetWidth: PropTypes.func,
  shouldClear: PropTypes.bool,
};

const defaultProps = {
  data: {},
  containerWidth: '',
  onGetWidth: defaultOnGetWidth,
  shouldClear: false,
};

class Viewport extends Component {
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
      viewportWidth: this.props.containerWidth || 0,
      maxElementCount: 5,
      calculatedWith: 0,
      elements: cachedElements,
      shouldClear: this.props.shouldClear,
    };
  }

  componentWillMount() {
    if (this.props.onGetWidth) {
      this.props.onGetWidth(this.props.containerWidth);
    }
  }

  componentWillReceiveProps(nextProps) {
    const data = nextProps.data;
    const calculatedWidth = this.allElementsWidth + data.width;

    if (this.state.elements.length <= this.state.maxElementCount
        && calculatedWidth <= this.state.viewportWidth) {
      this.setState({
        calculatedWidth: this.allElementsWidth,
      });
      this.state.elements.push(data);
    }
  }

  shouldComponentUpdate() {
    return this.state.elements.length <= this.state.maxElementCount
      && this.state.calculatedWith <= this.state.viewportWidth;
  }

  get allElementsWidth() {
    const elements = this.state.elements;
    let elementsWidth = 0;
    elements.forEach((item) => {
      elementsWidth += item.width;
    });
    return elementsWidth;
  }

  render() {
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
