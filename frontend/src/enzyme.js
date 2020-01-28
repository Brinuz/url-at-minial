/* eslint-disable object-curly-newline */
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@babel/polyfill';

configure({ adapter: new Adapter() });
export { shallow, mount };
