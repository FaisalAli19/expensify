import configMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { 
	startAddExpense, 
	addExpense, 
	editExpense, 
	removeExpense, 
	setExpenses, 
	startSetExpenses,
	startRemoveExpense,
	startEditExpense
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configMockStore([thunk])
const uid = 'fakeUid'
const defaultState = {
	auth: {
		uid
	}
}

beforeEach((done) => {
	const expensesData = {};
	expenses.forEach(({ id, description, amount, note, createdAt }) => {
		expensesData[id] = { description, amount, note, createdAt }
	})
	database().ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
})

test('should setup remove expense action object', () => {
	const action = removeExpense('1234acbds')
	expect(action).toEqual({ type: 'REMOVE_EXPENSE', id: '1234acbds' })
});

test('should remove expense from database', (done) => {
	const store = createMockStore(defaultState);
	const expenseId = expenses[0].id

	store.dispatch(startRemoveExpense(expenseId)).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'REMOVE_EXPENSE',
			id: expenses[0].id
		});

		return database().ref(`users/${uid}/expenses/${expenses[0].id}`).once('value')
	}).then((snapshot) => {
		expect(snapshot.val()).toBeNull();
		done();
	})
});

test('should setup edit expense action object', () => {
	const updates = {
		description: 'test',
		amount: 20000
	}
	const action = editExpense('123abc', updates)
	expect(action).toEqual({ type: 'EDIT_EXPENSE', id: '123abc', updates });
});

test('should update expense with the given id in database', (done) => {
	const store = createMockStore(defaultState);
	const expenseId = expenses[0].id
	const updates = {
		...expenses[0],
		description: 'Shoe',
		amount: 50000,
	}

	store.dispatch(startEditExpense(expenseId, updates)).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'EDIT_EXPENSE',
			id: expenseId,
			updates
		});

		return database().ref(`users/${uid}/expenses/${expenseId}`).once('value')
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(updates);
		done();
	})
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
	const store = createMockStore(defaultState);
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
		return database().ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
	}).then((snapshot) => {
			expect(snapshot.val()).toEqual(expenseData);
			done();
	})
});

test('should add expense with defaults to database store', (done) => {
	const store = createMockStore(defaultState);
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

		return database().ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(defaultData);
		done();
	})
});

test('should setup set expense action object with data', () => {
	const action = setExpenses(expenses);
	expect(action).toEqual({
		type: 'SET_EXPENSES',
		expenses
	});
});

test('should fetch the expenses from firebase', (done) => {
	const store = createMockStore(defaultState);

	store.dispatch(startSetExpenses()).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'SET_EXPENSES',
			expenses
		});
		done();
	})
});