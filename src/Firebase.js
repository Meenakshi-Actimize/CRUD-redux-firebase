// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyCjon29xjY5p1bhVGLGbz2rfH0pi7ERGQ4",
  authDomain: "crud-first-751c1.firebaseapp.com",
  databaseURL: "https://crud-first-751c1-default-rtdb.firebaseio.com",
  projectId: "crud-first-751c1",
  storageBucket: "crud-first-751c1.appspot.com",
  messagingSenderId: "314210277899",
  appId: "1:314210277899:web:aa8f97cd773c99bcea050e",
  measurementId: "G-4XWQMXTGY6"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;