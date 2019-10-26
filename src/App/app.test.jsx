import { mount } from 'enzyme';
import * as React from 'react';
import App from './app';
import Minify from './components/minify';

it('contains a body container', () => {
    const wrapper = mount(<App />);
    expect(wrapper.exists('div')).toBe(true);
    expect(wrapper.exists(Minify)).toBe(true);
});
