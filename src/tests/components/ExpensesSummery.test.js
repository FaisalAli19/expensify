import React from 'react'
import { shallow } from 'enzyme';

import { ExpensesSummery } from '../../components/ExpensesSummery';
import expenses from '../fixtures/expenses'

test('should render correctly with no data', () => {
	const wrapper = shallow(<ExpensesSummery expenses={[]} />)
	expect(wrapper).toMatchSnapshot();
});

test('should render correctly with expense data', () => {
	const wrapper = shallow(<ExpensesSummery expenses={[expenses[0]]} />)
	expect(wrapper).toMatchSnapshot();
});

test('should render correctly with expenses data', () => {
	const wrapper = shallow(<ExpensesSummery expenses={expenses} />)
	expect(wrapper).toMatchSnapshot();
});