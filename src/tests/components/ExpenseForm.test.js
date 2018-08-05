import React from 'react'
import { shallow } from 'enzyme';
import moment from 'moment'
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';

import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses'

test('should render ExpenseForm correctly', () => {
	const wrapper = shallow(<ExpenseForm />)
	expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm correctly with data', () => {
	const wrapper = shallow(<ExpenseForm expense={expenses[0]} />)
	expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
	const wrapper = shallow(<ExpenseForm />)
	expect(wrapper).toMatchSnapshot();
	wrapper.find('form').simulate('submit', { preventDefault: () => {} })
	expect(wrapper.state('error').length).toBeGreaterThan(0);
	expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
	const value = 'New description'
	const wrapper = shallow(<ExpenseForm />)
	expect(wrapper).toMatchSnapshot();
	wrapper.find('input').at(0).simulate('change', { target: { value } })
	expect(wrapper.state('description')).toEqual(value);
	expect(wrapper).toMatchSnapshot();
});

test('should set amount on input change with valid data', () => {
	const value = '200'
	const wrapper = shallow(<ExpenseForm />)
	expect(wrapper).toMatchSnapshot();
	wrapper.find('input').at(1).simulate('change', { target: { value } })
	expect(wrapper.state('amount')).toEqual(value);
	expect(wrapper).toMatchSnapshot();
});

test('should not set amount with invalid data', () => {
	const value = '20.2222'
	const wrapper = shallow(<ExpenseForm />)
	wrapper.find('input').at(1).simulate('change', { target: { value } })
	expect(wrapper.state('amount').length).toEqual(0);
});

test('should set note on textarea change', () => {
	const value = 'Test note'
	const wrapper = shallow(<ExpenseForm />)
	expect(wrapper).toMatchSnapshot();
	wrapper.find('textarea').simulate('change', { target: { value } })
	expect(wrapper.state('note')).toEqual(value);
	expect(wrapper).toMatchSnapshot();
});

test('should call onSubmit prop for valid form submission', () => {
	const onSubmitSpy = jest.fn();
	let returnValue = { ...expenses[0] }
	delete returnValue.id
	const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />)
	wrapper.find('form').simulate('submit', { preventDefault: () => {} })
	expect(wrapper.state('error')).toBe('');
	expect(onSubmitSpy).toHaveBeenLastCalledWith(returnValue);
});

test('should set new date on date change', () => {
	const now = moment()
	const wrapper = shallow(<ExpenseForm />)
	wrapper.find(SingleDatePicker).prop('onDateChange')(now)
	expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calender focus on change', () => {
	const wrapper = shallow(<ExpenseForm />)
	wrapper.find(SingleDatePicker).prop('onFocusChange')({ focused: true })
	expect(wrapper.state('focused')).toEqual(true);
});