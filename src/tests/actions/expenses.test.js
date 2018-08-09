import configMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configMockStore([thunk])

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
	const value = expenses[0]
	const action = addExpense(value)
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: value
	});
});

test('should add expense to database store', (done) => {
	const store = createMockStore({});
	const expenseData = {
		description: 'Mouse',
		amount: 30000,
		note: 'This one is better',
		createdAt: 1000
	}
	store.dispatch(startAddExpense(expenseData)).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...expenseData
			}
		});
		return database().ref(`expenses/${actions[0].expense.id}`).once('value')
	}).then((snapshot) => {
			expect(snapshot.val()).toEqual(expenseData);
			done();
	})
});

test('should add expense with defaults to database store', (done) => {
	const store = createMockStore({});
	const defaultData = {
		description: '',
		amount: 0,
		note: '',
		createdAt: 0
	}

	store.dispatch(startAddExpense({})).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...defaultData
			}
		});

		return database().ref(`expenses/${actions[0].expense.id}`).once('value')
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(defaultData);
		done();
	})
});
