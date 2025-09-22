// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// auth language responsive to browser lang
auth.useDeviceLanguage();
export function signout() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("sign out successfull");
      
    })
    .catch((error) => {
      // An error happened.
      console.error("An error happened.");
      
    });
}
export function signInPop() {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

const firestore = getFirestore(app);
