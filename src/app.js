import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux'

import configStore from './store/configStore'
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';
import './styles/styles.scss';
import './firebase/firebase';

const store = configStore();

const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
)

ReactDOM.render(jsx, document.getElementById('app'));
