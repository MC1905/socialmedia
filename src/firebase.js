// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getfirestore} from 'firebase/firestore';

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
const app = initializeApp(firebaseConfig);
const db = getfirestore(app);