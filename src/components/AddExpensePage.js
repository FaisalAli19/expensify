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
				<div className="page-header">
					<div className="content-container">
						<h2 className="page-header__title">Add Expense</h2>
					</div>
				</div>
				<div className="content-container">
					<ExpenseForm onSubmit={this.onSubmit} />
				</div>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	startAddExpense: (expense) => dispatch(startAddExpense(expense))
})


export default connect(null, mapDispatchToProps)(AddExpensePage);
