import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux'
import { startSetExpenses } from './actions/expenses';
import configStore from './store/configStore'
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';
import './styles/styles.scss';
import { auth } from './firebase/firebase';

const store = configStore();

const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
)

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

store.dispatch(startSetExpenses()).then(() => {
	ReactDOM.render(jsx, document.getElementById('app'));
})

auth().onAuthStateChanged((user) => {
	if (user) {
		console.log('Logged In');
	}else{
		console.log('Logged Out');
	}
})

