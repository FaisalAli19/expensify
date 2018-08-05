import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
	const state = expensesReducer(undefined, { type: '@@INIT' });
	expect(state).toEqual([]);
});

test('should remove expense by id', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: expenses[0].id
	}
	const state = expensesReducer(expenses, action)
	expect(state).toEqual([expenses[1], expenses[2]]);
});

test('should not remove expense if id not found', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: '2134'
	}
	const state = expensesReducer(expenses, action)
	expect(state).toEqual(expenses);
});

test('should add expenses', () => {
	const expense = {
		id: '4',
		description: 'Shopping',
		note: '',
		amount: 4500,
		createdAt: 0
	}
	const action = {
		type: 'ADD_EXPENSE',
		expense
	}
	const state = expensesReducer(expenses, action)
	expect(state).toEqual([...expenses, expense]);
});

test('should edit expenses by id', () => {
	const updates = {
		description: 'Ice cream',
		amount: 500,
	}
	const action = {
		type: 'EDIT_EXPENSE',
		id: expenses[0].id,
		updates
	}
	const state = expensesReducer(expenses, action)
	expect(state[0]).toEqual({ ...expenses[0], ...updates });
});

test('should not edit expenses if id not found', () => {
	const updates = {
		description: 'Ice cream',
		amount: 500,
	}
	const action = {
		type: 'EDIT_EXPENSE',
		id: '12112',
		updates
	}
	const state = expensesReducer(expenses, action)
	expect(state).toEqual(expenses);
});