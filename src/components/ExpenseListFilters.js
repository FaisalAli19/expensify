import React, { Component } from 'react';
import { connect } from 'react-redux'
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import uuid from 'uuid'

import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters'

export class ExpenseListFilters extends Component {
	state = {
		calendarFocused: null
	}
	onDatesChange = ({ startDate, endDate }) => {
		const { setStartDate, setEndDate } = this.props
		setStartDate(startDate)
		setEndDate(endDate)
	}
	onFocusChange = (calendarFocused) => {
		this.setState(() => ({ calendarFocused }))
	}
	onTextChange = (e) => {
		this.props.setTextFilter(e.target.value)
	}
	onFilterByChange = (e) => {
		const { sortByDate, sortByAmount } = this.props
		e.target.value === 'date' ? sortByDate() : sortByAmount()
	}
	render() {
		const { text, sortBy, startDate, endDate } = this.props.filters;
		return (
			<div className="content-container">
				<div className="input-group">
					<div className="input-group__item">
						<input className="text-input" type="text" value={text} 
							onChange={this.onTextChange}
							placeholder="Search expenses"
						/>
					</div>
					<div className="input-group__item">
						<select className="select-input" value={sortBy} onChange={this.onFilterByChange}>
							<option value="date">Date</option>
							<option value="amount">Amount</option>
						</select>
					</div>
					<div className="input-group__item">
						<DateRangePicker 
							startDate={startDate}
							startDateId={'1'}
							endDate={endDate}
							endDateId={'2'}
							onDatesChange={this.onDatesChange}
							focusedInput={this.state.calendarFocused}
							onFocusChange={this.onFocusChange}
							numberOfMonths={1}
							isOutsideRange={() => false}
							showClearDates={true}
						/>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		filters: state.filters
	};
}

const mapDispatchToProps = (dispatch) => ({ 
	setTextFilter: (text) => dispatch(setTextFilter(text)), 
	sortByDate: () => dispatch(sortByDate()), 
	sortByAmount: () => dispatch(sortByAmount()), 
	setStartDate: (date) => dispatch(setStartDate(date)), 
	setEndDate : (date) => dispatch(setEndDate(date))
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters)