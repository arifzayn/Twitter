import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBYRAgcCFfJn9J8S5Cc8V_AGY1bcjuGbHc",
  authDomain: "twitter-8f49f.firebaseapp.com",
  databaseURL: "https://twitter-8f49f-default-rtdb.firebaseio.com",
  projectId: "twitter-8f49f",
  storageBucket: "twitter-8f49f.appspot.com",
  messagingSenderId: "168733508903",
  appId: "1:168733508903:web:8b51dac5346df1b4235502",
  measurementId: "G-VG7KSWD7TS",
};

const fire = firebase.initializeApp(firebaseConfig);
var user = firebase.auth().currentUser;
var database = firebase.database();

export { fire, user, database };
