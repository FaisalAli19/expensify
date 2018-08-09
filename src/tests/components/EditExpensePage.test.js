import React from 'react';
import { shallow } from 'enzyme';

import { EditExpensePage } from '../../components/EditExpensePage'
import expenses from '../fixtures/expenses'

let onSubmitSpy, onRemoveSpy, historySpy, wrapper;

beforeEach(() => {
	onSubmitSpy = jest.fn()
	onRemoveSpy = jest.fn()
	historySpy = { push: jest.fn() }
	wrapper = shallow(
		<EditExpensePage 
			expense={expenses[0]} 
			editExpense={ onSubmitSpy } 
			startRemoveExpense={ onRemoveSpy }
			history={ historySpy } 
		/>
	)
})

test('should render EditExpensePage correctly', () => {
	expect(wrapper).toMatchSnapshot();
});

test('should handle edit expense correctly', () => {
	const id = expenses[0].id
	const updatedResult = { ...expenses[0], amount: '500' }

	wrapper.find('ExpenseForm').prop('onSubmit')(updatedResult)
	expect(historySpy.push).toHaveBeenLastCalledWith('/');
	expect(onSubmitSpy).toHaveBeenLastCalledWith(id, updatedResult);
});

test('should handle remove expense correctly', () => {
	wrapper.find('button').simulate('click')
	expect(historySpy.push).toHaveBeenLastCalledWith('/');
	expect(onRemoveSpy).toHaveBeenLastCalledWith(expenses[0].id);
});