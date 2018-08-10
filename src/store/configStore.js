import { applyMiddleware, createStore, combineReducers, compose } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk';

import expensesReducers from '../reducers/expenses'
import filtersReducers from '../reducers/filters'
import authReducers from '../reducers/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let middleware;

if (process.env.NODE_ENV === 'production') middleware = [thunk]
else middleware = [logger, thunk]

export default () => {
	const store = createStore(
		combineReducers({
			expenses: expensesReducers,
			filters: filtersReducers,
			auth: authReducers
		}),
		composeEnhancers(applyMiddleware(...middleware))
	)

	return store;
}
