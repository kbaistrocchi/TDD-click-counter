import React from 'react';
import App from './App';
import Enzyme,  {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new EnzymeAdapter() }); // let's enzyme know it will be using React 16


// JSX docs...?
/**
 * Factory function to create a ShallowWrapper for the App component
 * @function setup
 * @param {object} props - component props specific to this setup
 * @param {object} state - initial state for setup
 * @returns {ShallowWrapper}
 */
const setup = (props={}, state=null) => {
  const wrapper = shallow(<App {...props} />);
  if(state) wrapper.setState(state);
  return wrapper;
}

/**
 * Return ShallowWrapper containing node(s) with the given data-test value
 * @param {ShallowWrapper} wrapper - wrapper to search within
 * @param {string} val - value of data-test attribute for search
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
}

// test without using setups above
test('renders without error', () => {
  const wrapper = shallow(<App />);
  const appComponent = wrapper.find("[data-test='component-app']") // will pass test even if does not exist.
  //  need to make an assertion to determine if it actually found the data-test
  expect(appComponent.length).toBe(1);
});

// tests using the above setup function

test(' renders the increment button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'increment-button');
  expect(button.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = setup();
  const display = findByTestAttr(wrapper, 'counter-display');
  expect(display.length).toBe(1);
});

test('counter starts at 0', () => {
  // see what state is for counter
  // see whether or not it is 0
  // in TDD, this test will run before a state is defined and therefore be red.
  // Then we can define an initial state in App.js and the test goes green
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0);
});

test('clicking button increments counter DISPLAY', () => {
  // setting initial state (may not start at 0)
  const counter = 7;
  const wrapper = setup(null, { counter }); // {counter is a shortcut to take const counter as key and 7 as value}
  // find button
  const button = findByTestAttr(wrapper, 'increment-button');
  // simulate click
  button.simulate('click');
  // find display
  const display = findByTestAttr(wrapper, 'counter-display');
  // test that num in display matches what we expect count to be
  expect(display.text()).toContain(counter + 1) // this test is written before the code so it will fail

});