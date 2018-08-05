import React, { Component } from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';

class ExpenseForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			description: props.expense ? props.expense.description : '',
			amount: props.expense ? (props.expense.amount / 100).toString() : '',
			note: props.expense ? props.expense.note : '',
			createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
			focused: props.expense ? props.expense.focused : false,
			error: ''
		}
	}
	onDescriptionChange = (e) => {
		const description = e.target.value
		this.setState({ description })
	}
	onAmountChange = (e) => {
		const amount = e.target.value
		if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
			this.setState({ amount })
		}
	}
	onNoteChange = (e) => {
		const note = e.target.value
		this.setState({ note })
	}
	onDateChange = (createdAt) => {
		if (createdAt) {
			this.setState({ createdAt })
		}
	}
	onFocusedChange = ({ focused }) => {
		this.setState({ focused })
	}
	onSubmit = (e) => {
		e.preventDefault();
		const { description, amount, createdAt, note } = this.state

		if (!description || !amount) {
			let error = 'Please provide description and amount!'
			//Set error
			this.setState({ error })
		} else {
			this.setState({ error: '' })
			this.props.onSubmit({
				description,
				note,
				amount: parseFloat(amount, 10) * 100,
				createdAt: createdAt.valueOf()
			})
		}
	}
	render() {
		const { description, amount, note, createdAt, focused } = this.state;
		return (
			<div>
				{ this.state.error && <p>{this.state.error}</p>}
				<form onSubmit={this.onSubmit}>
					<input type="text" 
						placeholder="Description" autoFocus 
						value={ description } 
						onChange={this.onDescriptionChange}
					/>
					<input type="text" 
					placeholder="Amount" 
					value={ amount }
					onChange={this.onAmountChange}
					/>
					<SingleDatePicker 
						date={createdAt}
						onDateChange={this.onDateChange}
						focused={focused}
						onFocusChange={ this.onFocusedChange }
						numberOfMonths={1}
						isOutsideRange={() => false} //Enable prior date to current date
					/>
					<textarea 
						placeholder="Add a note for your expense (optional)"
						value={ note }
						onChange={this.onNoteChange}
						></textarea>
					<button>Add Expense</button>
				</form>
			</div>
		)
	}
}

export default ExpenseForm