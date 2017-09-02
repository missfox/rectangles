import React, { PropTypes } from 'react';
import Field from '../fields/fields';
import Button from '../button/button';

const defaultOnUpdate = () => console.warn('CreateRectangleForm onUpdate is not defined');

const propTypes = {
  onUpdate: PropTypes.func,
};

const defaultProps = {
  onUpdate: defaultOnUpdate,
};

// TODO: validation

class CreateRectangleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: null,
      height: null,
      posX: null,
      posY: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: parseInt(e.target.value, 10),
    });
  }

  handleClick() {
    const { onUpdate } = this.props;
    onUpdate(this.state);
  }

  render() {
    return (
      <form className="form">
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
CreateRectangleForm.defaultProps = defaultProps;

export default CreateRectangleForm;
