export default (expenses) => {
	return expenses
		.map(exp => exp.amount)
		.reduce((acc, num) => acc + num, 0)
}