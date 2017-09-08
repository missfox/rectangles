import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Rectangle from '../rectangle/rectangle';

const defaultOnGetWidth = () => {
  console.warn('Viewport onGetWidth is not defined');
};

const propTypes = {
  data: PropTypes.object,
  onGetWidth: PropTypes.func,
};

const defaultProps = {
  data: {},
  onGetWidth: defaultOnGetWidth,
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
      maxElementCount: 5,
      calculatedWith: 0,
      elements: cachedElements,
    };
  }

  componentDidMount() {
    if (this.props.onGetWidth) {
      this.props.onGetWidth(this.viewport.offsetWidth);
    }
  }

  componentWillReceiveProps(nextProps) {
    const data = nextProps.data;
    const dataWidth = data.width || 0;
    const calculatedWidth = this.allElementsWidth + dataWidth;

    if (!(Object.keys(data).length === 0 && data.constructor === Object)) {
      if (this.state.elements.length <= this.state.maxElementCount
        && calculatedWidth <= this.viewport.offsetWidth) {
        this.setState({
          calculatedWidth: this.allElementsWidth,
        });
        this.state.elements.push(data);
      } else {
        alert('Inappropriate data');
      }
    }
  }

  shouldComponentUpdate() {
    return this.state.elements.length <= this.state.maxElementCount
      && this.state.calculatedWith <= this.viewport.offsetWidth;
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
      <div className="viewport"
        ref={(viewport) => {
          this.viewport = viewport;
        }}
      >
        {rectangles}
      </div>
    );
  }
}

Viewport.propTypes = propTypes;
Viewport.defaultProps = defaultProps;

export default Viewport;
