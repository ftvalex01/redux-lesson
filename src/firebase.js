import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDqiHsZy43ZOAjkUAlpC1XCdU0cO21JcnI",
  authDomain: "pokemon-3f3e1.firebaseapp.com",
  projectId: "pokemon-3f3e1",
  storageBucket: "pokemon-3f3e1.appspot.com",
  messagingSenderId: "220124628960",
  appId: "1:220124628960:web:8edfa98e5b5c54642f0d85"
};

// Initialize Firebase
 firebase.initializeApp(firebaseConfig);

 const auth = firebase.auth()
 const db = firebase.firestore()
 const storage = firebase.storage()

 export {auth , firebase , db, storage}