import { auth, googleAuthProvider } from '../firebase/firebase';

// Login Action
export const login = (uid) => ({
	type: 'LOGIN',
	uid
})

export const startLogin = () => {
	return () => {
		return auth().signInWithPopup(googleAuthProvider)
	}
}

// Logout Action
export const logout = () => ({
	type: 'LOGOUT'
})

export const startLogout = () => {
	return () => {
		return auth().signOut();
	};
}