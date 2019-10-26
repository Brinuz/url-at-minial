import { mount } from 'enzyme';
import * as React from 'react';
import Minify from './index';

describe('initial renders', () => {
    it('renders all the required inputs', () => {
        const wrapper = mount(<Minify />);
        expect(wrapper.find('input').props().type).toBe('text');
        expect(wrapper.find('button').text()).toBe('Minify');
    });
});
