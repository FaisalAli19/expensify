import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import AppRouter, { history } from './routers/AppRouter';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth'
import configStore from './store/configStore'
import { auth } from './firebase/firebase';

import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';
import './styles/styles.scss';

const store = configStore();

const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
)

let hasRendered = false;
const renderApp = () => {
	if (!hasRendered) {
		ReactDOM.render(jsx, document.getElementById('app'));
		hasRendered = true;
	}
}

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

auth().onAuthStateChanged((user) => {
	if (user) {
		store.dispatch(login(user.uid))
		store.dispatch(startSetExpenses()).then(() => {
			renderApp();
			if (history.location.pathname === '/') history.push('/dashboard')
		})
	}else{
		store.dispatch(logout())
		renderApp()
		history.push('/')
	}
})

