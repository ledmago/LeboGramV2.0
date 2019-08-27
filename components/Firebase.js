import * as firebase from 'firebase';
import '@firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD5x_BhDLypvc6q5E5GIGb39B0Qg36KsXA",
  authDomain: "lebogram-4312a.firebaseapp.com",
  databaseURL: "https://lebogram-4312a.firebaseio.com",
  projectId: "lebogram-4312a",
  storageBucket: "lebogram-4312a.appspot.com",
  messagingSenderId: "274680399612",
  appId: "1:274680399612:web:b3d330d796327d3c"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
