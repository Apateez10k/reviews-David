import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Reviews from '../client/components/Reviews';

Enzyme.configure({ adapter: new Adapter() });


test('render a label', () => {
  const wrapper = shallow(<Reviews />);
  expect(wrapper).toMatchSnapshot();
});
