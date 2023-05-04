import React from 'react';
import {auth} from './firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import Login from './authentication/login';
import Mainpage from './authentication/main';


function App() {

const [user] = useAuthState(auth);

// here it'll check whether user is logged in or not if not it'll show login so while checking it'll take a sec in that time we need to add loader

return (
	user ? <Mainpage/> : <Login/>
);

}

export default App;
