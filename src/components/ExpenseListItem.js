import React from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';

const ExpenseListItem = (props) => {
	const { description, amount, createdAt, id } = props;
	return (
		<div>
			<Link to={`/edit/${id}`}>
				<h3>{description}</h3>
			</Link>
			<p>{amount} - {moment(createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
		</div>
	)
}

export default ExpenseListItem;