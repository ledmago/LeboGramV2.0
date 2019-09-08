import * as firebase from 'firebase';
import '@firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAZXN9IibT8cESSWrxz_GJC7Co8DtoNI60",
    authDomain: "lebogram2.firebaseapp.com",
    databaseURL: "https://lebogram2.firebaseio.com",
    projectId: "lebogram2",
    storageBucket: "lebogram2.appspot.com",
    messagingSenderId: "10383902545",
    appId: "1:10383902545:web:bb3a5b529dfc8972593570"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
