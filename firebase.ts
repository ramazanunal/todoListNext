// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCH5fHszeA4QPM6pV3qIkCgOMk3dE-IJ4Y",
  authDomain: "todolist-9a181.firebaseapp.com",
  projectId: "todolist-9a181",
  storageBucket: "todolist-9a181.firebasestorage.app",
  messagingSenderId: "958983274000",
  appId: "1:958983274000:web:8174989346edbb5d461495",
  measurementId: "G-X546M677DR",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
