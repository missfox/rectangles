import React from 'react';
import { shallow } from 'enzyme';

import CreateRectangleForm from '../../../../src/components/forms/create-rectangle-form';
import Field from '../../../../src/components/fields/fields';

describe('<CreateRectangleForm />', () => {
  const onUpdateSpy = jest.fn();
  const viewportWidth = 940;
  const wrapper =
    shallow(<CreateRectangleForm viewportWidth={viewportWidth} onUpdate={onUpdateSpy} />);
  it('should render four <Field /> components', () => {
    expect(wrapper.find(Field).length).toBe(4);
  });

  it('should call onChange on input changes', () => {
    wrapper.find('#width').simulate('change', {
      target: { value: '123' },
    });
  });
});
