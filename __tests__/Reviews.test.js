import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';
import Reviews from '../../client/components/Reviews.jsx'

Enzyme.configure({ adapter: new Adapter() });


test('render a label', () => {
    const wrapper = shallow(
        <Reviews/>
    );
    expect(wrapper).toMatchSnapshot();
});
