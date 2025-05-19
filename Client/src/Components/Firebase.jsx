// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ✅ Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbJUIaNiffSIEtdHpvsjxZGgvdCLcorR8",
  authDomain: "react-app-b6d3a.firebaseapp.com",
  projectId: "react-app-b6d3a",
  storageBucket: "react-app-b6d3a.appspot.com",
  messagingSenderId: "1085003411972",
  appId: "1:1085003411972:web:ddda94f2e0f1b32d433b51",
};

// ✅ Initialize Firebase App
const firebaseApp = initializeApp(firebaseConfig);

// ✅ Initialize Firestore
const db = getFirestore(firebaseApp);

export { db };
