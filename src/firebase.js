import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'
import * as config from './config';

const firebaseConfig = {
        apiKey: config.APIKEY,
        authDomain: config.AUTHDOMAIN,
        projectId: config.PROJECTID,
        storageBucket: config.STORAGEBUCKET,
        messagingSenderId: config.MSGID,
        appId: config.APPID
};

firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
const storage = firebase.storage();     

export {firebase,auth, storage };

