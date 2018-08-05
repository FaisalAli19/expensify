import React, { Component } from 'react'
import { connect } from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { addExpense } from '../actions/expenses'

export class AddExpensePage extends Component {
	onSubmit = (expense) => {
		const { addExpense, history } = this.props
		addExpense(expense)
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
	addExpense: (expense) => dispatch(addExpense(expense))
})


export default connect(null, mapDispatchToProps)(AddExpensePage);
