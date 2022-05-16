import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCY3WS0YEl2j_82V1xx5tkN9h06l5SksPg",
  authDomain: "react-vite-199d0.firebaseapp.com",
  projectId: "react-vite-199d0",
  storageBucket: "react-vite-199d0.appspot.com",
  messagingSenderId: "705058125370",
  appId: "1:705058125370:web:9a4e4126464a21344fe703"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export{ auth };