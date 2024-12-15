// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBPZKmuLpi2-uYPe2EAvuRc4bjdjaMGxws",
  authDomain: "test-b2434.firebaseapp.com",
  databaseURL: "https://test-b2434-default-rtdb.firebaseio.com",
  projectId: "test-b2434",
  storageBucket: "test-b2434.firebasestorage.app",
  messagingSenderId: "874534405127",
  appId: "1:874534405127:web:5e81d8eaa6b733823856a2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);