import moment from 'moment'

export default [{
		id: "1",
		description: 'Gum',
		note: '',
		amount: 200,
		createdAt: 0
	},
	{
		id: "2",
		description: 'Milk',
		note: '',
		amount: 2000,
		createdAt: moment(0).subtract(4, 'days').valueOf()
	},
	{
		id: "3",
		description: 'Rent',
		note: '',
		amount: 4500,
		createdAt: moment(0).add(4, 'days').valueOf()
	}
]