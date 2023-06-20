// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import {getfirestore} from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsBO_0m-P2MgHueCR9uMwWz4hMczdtfPk",
  authDomain: "platform-1bac9.firebaseapp.com",
  projectId: "platform-1bac9",
  storageBucket: "platform-1bac9.appspot.com",
  messagingSenderId: "716511308874",
  appId: "1:716511308874:web:93276b05934478393a8ab3"
};



// Initialize Firebase
// const db = getfirestore(app);
const app = initializeApp(firebaseConfig,);
export const auth = getAuth(app);
export const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

export const signInWithEmailPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    throw new Error(error.message);
  }
};