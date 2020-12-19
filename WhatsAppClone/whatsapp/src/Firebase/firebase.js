import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD38tRkH3Zc-yvpSJz7bz-XLwaCyjvIVbc",
  authDomain: "whatsapp-mern-b7d58.firebaseapp.com",
  databaseURL: "https://whatsapp-mern-b7d58.firebaseio.com",
  projectId: "whatsapp-mern-b7d58",
  storageBucket: "whatsapp-mern-b7d58.appspot.com",
  messagingSenderId: "1006182813967",
  appId: "1:1006182813967:web:f7dafc9ca0e1a71d79ae7a",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
