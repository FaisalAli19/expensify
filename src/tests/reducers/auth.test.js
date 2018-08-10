
import authReducers from '../../reducers/auth';

test('should set uid for login', () => {
	const uid = "2fhsg2gjvj3hgr"
	const action = {
		type: 'LOGIN',
		uid
	}
	const state = authReducers({}, action)
	expect(state.uid).toEqual(uid);
});

test('should clear uid for logout', () => {
	const state = authReducers({ uid: 'anything' }, { type: 'LOGOUT' })
	expect(state).toEqual({});
});