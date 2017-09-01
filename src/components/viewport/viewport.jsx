import React from 'react';
import { Rectangle } from '../rectangle/rectangle';

export class Viewport extends React.Component {
  constructor(props) {
    super(props);
    let cachedElements = [];

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
    let rectangles;
    if (this.state.elements.length < 6 && !!data) {
      this.state.elements.push(data);
    }

    rectangles = this.state.elements.map((item, index) => {
      localStorage.setItem(`item-${index}`, JSON.stringify(item));
      return <Rectangle width={item.width} height={item.height}
                        left={item.posX} top={item.posY} key={index}/>;
    });

    return (
      <div className="viewport">
        {rectangles}
      </div>
    );
  }
}
