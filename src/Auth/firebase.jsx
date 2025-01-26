// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARXw1vcUTplDNLdndSSfoeXyi-xlCjLwo",
  authDomain: "sondo-dc030.firebaseapp.com",
  projectId: "sondo-dc030",
  storageBucket: "sondo-dc030.firebasestorage.app",
  messagingSenderId: "820810975062",
  appId: "1:820810975062:web:f0339a76103d5591c9b8f7",
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication
const auth = getAuth(app);

// Export the auth object
export { auth };
export default app;
export const db = getFirestore(app);