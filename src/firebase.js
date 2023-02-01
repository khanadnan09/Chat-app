import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA54-oyEOS3L9GauDDgnrwlvNJRXkzUW3c",
  authDomain: "chat-app-35c02.firebaseapp.com",
  projectId: "chat-app-35c02",
  storageBucket: "chat-app-35c02.appspot.com",
  messagingSenderId: "745278232742",
  appId: "1:745278232742:web:66935282426ea92051fc67",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
