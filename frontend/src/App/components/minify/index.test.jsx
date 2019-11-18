import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import Minify from './index';
import ApiService from '../../services/api-service';

describe('initial renders', () => {
    it('renders all the required inputs', () => {
        const api = new ApiService('');
        const wrapper = mount(<Minify api={api} />);
        expect(wrapper.find('input').props().type).toBe('text');
        expect(wrapper.find('button').text()).toBe('Minify');
        expect(wrapper.exists('a')).toBe(false);
    });
});

describe('on clicking "minify"', () => {
    let wrapper;
    let api;

    beforeEach(() => {
        api = new ApiService('');
        wrapper = mount(<Minify api={api} />);
    });

    describe('on valid response', () => {
        it('renders minified url', async () => {
            const testUrl = 'http://www.google.com';
            const spy = jest.spyOn(api, 'minify').mockResolvedValue(
                {
                    status: 204,
                    data: { minified: 'https://mini.fy/randomhash' },
                },
            );

            wrapper.find('input').simulate('change', { target: { value: testUrl } });
            await act(async () => {
                wrapper.find('button').simulate('click');
            });
            wrapper.update();

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(testUrl);
            expect(wrapper.find('a').text()).toBe('https://mini.fy/randomhash');
            expect(wrapper.find('a').props().href).toBe('https://mini.fy/randomhash');
        });
    });
    describe('on invalid response', () => {
        it('renders error', async () => {
            const spy = jest.spyOn(api, 'minify').mockRejectedValue();

            await act(async () => {
                wrapper.find('button').simulate('click');
            });
            wrapper.update();

            expect(spy).toHaveBeenCalledTimes(1);
            expect(wrapper.find('p').text()).toBe('Couldn\'t minify url');
        });
    });
});
