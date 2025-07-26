// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMb2pbNtLqGdxDZeK3uKXDS7aEvmaRkQk",
  authDomain: "urun-ekleme-e6ea5.firebaseapp.com",
  databaseURL: "https://urun-ekleme-e6ea5-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "urun-ekleme-e6ea5",
  storageBucket: "urun-ekleme-e6ea5.firebasestorage.app",
  messagingSenderId: "980371638092",
  appId: "1:980371638092:web:8559a0afe0c2ab3032b1e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
