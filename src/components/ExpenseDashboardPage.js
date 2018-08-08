import React from 'react';

import ExpenseList from './ExpenseList'
import ExpenseListFilters from './ExpenseListFilters';
import ExpensesSummery from './ExpensesSummery'

const ExpenseDashboardPage = (props) => {
	return (
		<div>
			<ExpensesSummery />
			<ExpenseListFilters />
			<ExpenseList />
  	</div>
	)
};

const mapStateToProps = state => {
	return {
		expenses: selectExpenses(state.expenses, state.filters)
	}
}

export default ExpenseDashboardPage;
