import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';
import Description from '../../client/components/Description.jsx'

Enzyme.configure({ adapter: new Adapter() });


test('render a label', () => {
    const wrapper = shallow(
        <Description/>
    );
    wrapper.instance().props
    expect(wrapper).toMatchSnapshot();
});
