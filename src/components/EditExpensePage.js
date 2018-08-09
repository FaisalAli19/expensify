import React, { Component } from 'react'
import { connect } from 'react-redux';

import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends Component {
	onSubmitForm = (updatedExpense) => {
		const { startEditExpense, history, expense } = this.props
		startEditExpense(expense.id, updatedExpense)
		history.push('/')
	}
	onRemove = () => {
		const { startRemoveExpense, expense, history } = this.props
		startRemoveExpense(expense.id)
		history.push('/')
	}
	render() {
		return (
			<div>
				<ExpenseForm  expense={this.props.expense} onSubmit={this.onSubmitForm} />
				<button onClick={this.onRemove}>Remove</button>
  		</div>
		)
	}
}

const mapStateToProps = (state, props) => ({
	expense: state.expenses.find(exp => exp.id === props.match.params.id)
})

const mapDispatchToProps = (dispatch) => ({ 
		startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
		startRemoveExpense: (id) => dispatch(startRemoveExpense(id))
})


export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
