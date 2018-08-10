import React from 'react';

import ExpenseList from './ExpenseList'
import ExpenseListFilters from './ExpenseListFilters';
import ExpensesSummery from './ExpensesSummery'

const ExpenseDashboardPage = () => {
	return (
		<div>
			<ExpensesSummery />
			<ExpenseListFilters />
			<ExpenseList />
  	</div>
	)
};

export default ExpenseDashboardPage;
