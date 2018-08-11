import React from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

numeral.register('locale', 'inr', {
	delimiters: {
		thousands: ',',
		decimal: '.'
	},
	abbreviations: {
		thousand: 'k',
		million: 'm',
		billion: 'b',
		trillion: 't'
	},
	ordinal: function (number) {
		return number === 1 ? 'er' : 'ème';
	},
	currency: {
		symbol: '₹'
	}
});

numeral.locale('inr');

const ExpenseListItem = (props) => {
	const { description, amount, createdAt, id } = props;
	return (
		<Link className="list-items" to={`/edit/${id}`}>
			<div>
				<h3 className="list-items__title">{description}</h3>
				<span className="list-items__sub-title"> { moment(createdAt).format("MMMM Do YYYY") } </span>
			</div>
			<h3 className="list-items__amount"> { numeral(amount / 100).format('$0,0a') } </h3>
		</Link>
	)
}

export default ExpenseListItem;