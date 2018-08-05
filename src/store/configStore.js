import { applyMiddleware, createStore, combineReducers } from 'redux'
import logger from 'redux-logger'

import expensesReducers from '../reducers/expenses'
import filtersReducers from '../reducers/filters'

export default () => {
	const store = createStore(
		combineReducers({
			expenses: expensesReducers,
			filters: filtersReducers
		}),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
		applyMiddleware(logger)
	)

	return store;
}
