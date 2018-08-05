import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should setup remove expense action object', () => {
	const action = removeExpense('1234acbds')
	expect(action).toEqual({ type: 'REMOVE_EXPENSE', id: '1234acbds' })
});

test('should setip edit expense action object', () => {
	const updates = {
		description: 'test',
		amount: 20000
	}
	const action = editExpense('123abc', updates)
	expect(action).toEqual({ type: 'EDIT_EXPENSE', id: '123abc', updates });
});

test('should setup add expense action object with provided value', () => {
	const value = { description: 'Test', note: 'testing', amount: 200, createdAt: 1 }
	const action = addExpense(value)
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			id: expect.any(String),
			...value
		}
	});
});

test('should setup add expense action object with default value', () => {
	const action = addExpense({})
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			description: '',
			note: '',
			amount: 0, 
			createdAt: 0,
			id: expect.any(String)
		}
	});
});