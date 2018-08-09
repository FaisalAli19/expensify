import React, { Component } from 'react'
import { connect } from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { startAddExpense } from '../actions/expenses'

export class AddExpensePage extends Component {
	onSubmit = (expense) => {
		const { startAddExpense, history } = this.props
		startAddExpense(expense)
		history.push('/')
	}
	render() {
		return (
			<div>
				<h2>Add Expense</h2>
				<ExpenseForm onSubmit={this.onSubmit} />
  		</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	startAddExpense: (expense) => dispatch(startAddExpense(expense))
})


export default connect(null, mapDispatchToProps)(AddExpensePage);
