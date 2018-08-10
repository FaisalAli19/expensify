import { auth, googleAuthProvider } from '../firebase/firebase';

export const startLogin = () => {
	return () => {
		return auth().signInWithPopup(googleAuthProvider)
	}
}

export const startLogout = () => {
	return () => {
		return auth().signOut();
	};
}