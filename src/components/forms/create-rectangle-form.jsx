import React from 'react';
import PropTypes from 'prop-types';
import Field from '../fields/fields';
import Button from '../button/button';

const propTypes = {
  viewportWidth: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

class CreateRectangleForm extends React.Component {
  constructor(props) {
    super(props);
    const num = [];
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).includes('item')) {
        num.push(parseInt(localStorage.key(i).substr(5, 6), 10) + 1);
      }
    }

    this.state = {
      id: Math.max(...num) !== -Infinity ? Math.max(...num) : 0,
      width: null,
      height: null,
      posX: null,
      posY: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    let val = e.target.value;
    val = parseInt(e.target.value.replace(/[^0-9]/gi, ''), 10) || 0;
    e.target.value = val;

    this.setState({
      [e.target.name]: val,
    });
  }

  handleClick() {
    const { onUpdate } = this.props;
    const lastId = ++this.state.id;
    let isValid;
    this.setState({
      id: lastId,
    });
    for (const [key, value] of Object.entries(this.state)) {
      if (!value || parseInt(value, 10) === 0) {
        isValid = false;
        break;
      }

      isValid = true;
    }

    if (isValid) {
      onUpdate(this.state);
    } else {
      alert('Data is not valid');
    }
  }

  render() {
    return (
      <form className="form">
        <div className="form__row">
          You can only use digits. All another symbols types will be replaced.
          <br />
          You can create only five rectangles.
          The sum of widths cannot be larger than the viewport width ({this.props.viewportWidth}px).
        </div>
        <div className="form__row">
          <div className="form__column">
            <Field
              type="number"
              className="input input__text"
              id="width"
              name="width"
              label="Width"
              labelClassName="label label_type_block"
              onChange={this.handleChange}
            />
          </div>
          <div className="form__column">
            <Field
              type="number"
              className="input input__text"
              id="height"
              name="height"
              label="Height"
              labelClassName="label label_type_block"
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div className="form__row">
          <div className="form__column">
            <Field
              type="number"
              className="input input__text"
              id="pos-x"
              name="posX"
              label="Position X"
              labelClassName="label label_type_block"
              onChange={this.handleChange}
            />
          </div>
          <div className="form__column">
            <Field
              type="number"
              className="input input__text"
              id="pos-y"
              name="posY"
              label="Position Y"
              labelClassName="label label_type_block"
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div className="form__row form__footer">
          <div className="form__column">
            <Button type="button" text="Create" className="button" onClick={this.handleClick} />
          </div>
          <div className="form__column">
            <Button type="reset" text="Clear form" className="button" />
          </div>
        </div>
      </form>
    );
  }
}

CreateRectangleForm.propTypes = propTypes;

export default CreateRectangleForm;
