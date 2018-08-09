import { applyMiddleware, createStore, combineReducers, compose } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk';

import expensesReducers from '../reducers/expenses'
import filtersReducers from '../reducers/filters'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
	const store = createStore(
		combineReducers({
			expenses: expensesReducers,
			filters: filtersReducers
		}),
		composeEnhancers(applyMiddleware(logger, thunk))
	)

	return store;
}
