import firebase from 'firebase';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrrF_yUmR8KeKra7jpb900oGI8kujbmOw",
  authDomain: "bt3103-week-6-7871b.firebaseapp.com",
  projectId: "bt3103-week-6-7871b",
  storageBucket: "bt3103-week-6-7871b.appspot.com",
  messagingSenderId: "628246290373",
  appId: "1:628246290373:web:8744c5c41abc7d9b60b5ac",
  measurementId: "G-WEF25M5S89"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;