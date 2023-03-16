import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZm77Z5sJxm4H4jTes9F2fbd2GnRYAajE",
  authDomain: "social-app-cc06e.firebaseapp.com",
  projectId: "social-app-cc06e",
  storageBucket: "social-app-cc06e.appspot.com",
  messagingSenderId: "698510665123",
  appId: "1:698510665123:web:70d4b45535869c00fae616"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);