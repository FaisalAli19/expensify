import moment from 'moment'
import filterReducers from '../../reducers/filters';

test('should setup default filter state value', () => {
	const state = filterReducers(undefined, { type: '@@INIT'})
	expect(state).toEqual({
		text: '',
		sortBy: 'date',
		startDate: moment().startOf('month'),
		endDate: moment().endOf('month')
	});
});

test('should sort by amount', () => {
	const state = filterReducers(undefined, { type: 'SORT_BY_AMOUNT' })
	expect(state).toEqual({
		text: '',
		sortBy: 'amount',
		startDate: moment().startOf('month'),
		endDate: moment().endOf('month')
	});
});

test('should sort by amount', () => {
	const currentState = {
		text: '',
		sortBy: 'amount',
		startDate: moment().startOf('month'),
		endDate: moment().endOf('month')
	}
	const state = filterReducers(currentState, { type: 'SORT_BY_DATE' })
	expect(state).toEqual({
		text: '',
		sortBy: 'date',
		startDate: moment().startOf('month'),
		endDate: moment().endOf('month')
	});
});

test('should set text filter', () => {
	const currentState = {
		text: '',
		sortBy: 'date',
		startDate: undefined,
		endDate: undefined
	}
	const text = 'Test'
	const state = filterReducers(currentState, { type: 'SET_TEXT_FILTER', text})
	expect(state).toEqual({ ...currentState, text });
});

test('should set startDate of the filter', () => {
	const currentState = {
		text: '',
		sortBy: 'date',
		startDate: undefined,
		endDate: undefined
	}
	const startDate = moment().startOf('month')
	const state = filterReducers(currentState, { type: 'SET_START_DATE', startDate})
	expect(state).toEqual({ ...currentState, startDate });
});

test('should set endDate of the filter', () => {
	const currentState = {
		text: '',
		sortBy: 'date',
		startDate: undefined,
		endDate: undefined
	}
	const endDate = moment().startOf('month')
	const state = filterReducers(currentState, { type: 'SET_END_DATE', endDate})
	expect(state).toEqual({ ...currentState, endDate });
});