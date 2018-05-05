import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Description from '../client/components/Description';

Enzyme.configure({ adapter: new Adapter() });

test('render a label', () => {
  const wrapper = shallow(<Description />);
  expect(wrapper).toMatchSnapshot();
});
