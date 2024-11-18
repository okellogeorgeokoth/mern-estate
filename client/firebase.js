// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-fe5ab.firebaseapp.com",
  projectId: "mern-estate-fe5ab",
  storageBucket: "mern-estate-fe5ab.firebasestorage.app",
  messagingSenderId: "479103124414",
  appId: "1:479103124414:web:950735d076f98d23312fef",
  measurementId: "G-6MWKSV2HJP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
