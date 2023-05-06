import React from 'react';
import {auth} from './firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import Login from './authentication/login';
import Mainpage from './authentication/main';
import {CircularProgress} from '@mui/material';
import "./App.css";
import { useState, useEffect } from 'react';

function App() {
	const [user] = useAuthState(auth);
	const [isLoading, setIsLoading] = useState(true);

	/**
	 * Here we set up a listener for authentication state changes.
	 * Whenever the auth state changes, we update the user state with 
	 * the new user object (or null if the user logs out), and display 
	 * the loading spinner for 2 secs */
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
		  setIsLoading(false);
		  console.log(user);
		}, error => {
		  console.log('Authentication error:', error);
		});
		return unsubscribe;
	  }, []);
  
	if (isLoading) {
		return (
			<div className="App-Loader">
				<CircularProgress />
			</div>
		);
	}
  
	return user ? <Mainpage /> : <Login />;
  }

export default App;
