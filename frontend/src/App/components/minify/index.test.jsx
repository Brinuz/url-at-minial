import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import Minify from './index';
import ApiService from '../../services/api-service';

describe('initial renders', () => {
    it('renders all the required inputs', () => {
        const wrapper = mount(<Minify />);
        expect(wrapper.find('input').props().type).toBe('text');
        expect(wrapper.find('button').text()).toBe('Minify');
        expect(wrapper.exists('a')).toBe(false);
    });
});

describe('on clicking "minify"', () => {
    let wrapper;

    beforeEach(() => {
        jest.clearAllMocks();
        wrapper = mount(<Minify />);
    });

    describe('on valid response', () => {
        it('renders minified url', async () => {
            const testUrl = 'http://www.google.com';
            const spy = jest.spyOn(ApiService, 'minify').mockResolvedValue(
                {
                    status: 204,
                    data: { URL: 'randomhash' },
                },
            );

            wrapper.find('input').simulate('change', { target: { value: testUrl } });
            await act(async () => {
                wrapper.find('button').simulate('click');
            });
            wrapper.update();

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(testUrl);
            expect(wrapper.find('a').text()).toBe('urldo.me/randomhash');
            expect(wrapper.find('a').props().href).toBe('http://urldo.me/randomhash');
        });
    });
    describe('on invalid response', () => {
        it('renders error', async () => {
            const spy = jest.spyOn(ApiService, 'minify').mockRejectedValue();

            await act(async () => {
                wrapper.find('button').simulate('click');
            });
            wrapper.update();

            expect(spy).toHaveBeenCalledTimes(1);
            expect(wrapper.find('p').text()).toBe('Couldn\'t minify url');
        });
    });
});
