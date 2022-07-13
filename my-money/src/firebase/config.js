import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBgpGufBPeWkk7TXpYgxI3-_RdsnnvTA08",
  authDomain: "samila-kitchen-2022.firebaseapp.com",
  projectId: "samila-kitchen-2022",
  storageBucket: "samila-kitchen-2022.appspot.com",
  messagingSenderId: "936530677800",
  appId: "1:936530677800:web:15acc5658918d6ceab251d",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init servicess
const firestore = firebase.firestore();

// init auth
const auth = firebase.auth();

//timestamp
const timestamp = firebase.firestore.Timestamp;

export { firestore, auth, timestamp };
