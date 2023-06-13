// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import {getfirestore} from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, } from "firebase/auth";

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

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
    })
    .catch((error) => {
      console.log(error);
    });
};