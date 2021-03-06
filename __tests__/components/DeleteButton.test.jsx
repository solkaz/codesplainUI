import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import DeleteButton from '../../src/components/buttons/DeleteButton';

describe('<DeleteButton />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = node => shallow(node, { context: { muiTheme } });

  it('matches snapshot of when the app is not in read-only mode', () => {
    const wrapper = shallowWithContext(
      <DeleteButton
        onClick={jest.fn()}
        isEnabled={false}
      />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot of when the app is in read-only mode', () => {
    const wrapper = shallowWithContext(
      <DeleteButton
        onClick={jest.fn()}
        isEnabled
      />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('prop: onClick', () => {
    it('is triggered when clicked', () => {
      const onClick = jest.fn();
      const wrapper = shallowWithContext(
        <DeleteButton
          onClick={onClick}
          isEnabled
        />,
    );
      const button = wrapper.find('IconButton');
      button.simulate('touchTap');
      expect(onClick).toHaveBeenCalled();
    });
  });
});
