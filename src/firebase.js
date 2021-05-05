// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAcqRshWeKNBK77AmJL8lJ7z0_F5WzbnJ4",
    authDomain: "campus-quora1.firebaseapp.com",
    projectId: "campus-quora1",
    storageBucket: "campus-quora1.appspot.com",
    messagingSenderId: "384308282472",
    appId: "1:384308282472:web:13fc8582746d8fd978a7dd",
    measurementId: "G-2SL8HL6DEF"
  };


const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebaseApp.firestore();

export { auth, provider };
export default db;