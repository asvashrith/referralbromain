import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

const firebaseConfig = {
	// credentials of referralBro in firebase
        apiKey: "AIzaSyDcchvK2C6WHZZ2aFEKnpyS_9vYm2fkJSY",
        authDomain: "referralbro.firebaseapp.com",
        projectId: "referralbro",
        storageBucket: "referralbro.appspot.com",
        messagingSenderId: "806654918049",
        appId: "1:806654918049:web:2a196098bbc4df46f4dfe0"
};

firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
const storage = firebase.storage();     

export {firebase,auth, storage };

