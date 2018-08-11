import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';

import selectExpenses from '../selectors/expenses'
import selectedExpensesTotal from '../selectors/expense-total';


export const ExpensesSummery = ({ expenses }) => {
	const expenseWord = expenses.length === 1 ? 'expense' : 'expenses'
	const expenseTotal = numeral(selectedExpensesTotal(expenses) / 100).format('$0,0')
	return (
		<div className="page-header">
		<div className="content-container">
			<h1 className="page-header__title">
				Viewing <span>{ expenses.length }</span> { expenseWord } totalling <span>{ expenseTotal }</span>
			</h1>
			<div className="page-header__actions">
				<Link className="buttons" to="/create">Add Expense</Link>
			</div>
		</div>
		</div>
	)
};

const mapStateToProps = state => {
	return {
		expenses: selectExpenses(state.expenses, state.filters)
	}
}

export default connect(mapStateToProps)(ExpensesSummery);