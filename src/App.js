import React from 'react';
import {auth} from './firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import Login from './authentication/login';
import Mainpage from './authentication/main';


function App() {

const [user] = useAuthState(auth);

return (
	user ? <Mainpage/> : <Login/>
);

}

export default App;
