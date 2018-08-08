import React from 'react'
import { connect } from 'react-redux';
import numeral from 'numeral';

import selectExpenses from '../selectors/expenses'
import selectedExpensesTotal from '../selectors/expense-total';


export const ExpensesSummery = ({ expenses }) => {
	const expenseWord = expenses.length === 1 ? 'expense' : 'expenses'
	return (
		<p>
			Viewing { expenses.length } { expenseWord } totalling { 
				numeral(selectedExpensesTotal(expenses) / 100).format('$0,0')
			}
		</p>
	)
};

const mapStateToProps = state => {
	return {
		expenses: selectExpenses(state.expenses, state.filters)
	}
}

export default connect(mapStateToProps)(ExpensesSummery);