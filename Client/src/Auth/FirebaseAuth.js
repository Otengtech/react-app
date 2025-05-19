import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBbJUIaNiffSIEtdHpvsjxZGgvdCLcorR8",
  authDomain: "react-app-b6d3a.firebaseapp.com",
  projectId: "react-app-b6d3a",
  storageBucket: "react-app-b6d3a.firebasestorage.app",
  messagingSenderId: "1085003411972",
  appId: "1:1085003411972:web:ddda94f2e0f1b32d433b51"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 
export const storage = getStorage(app);
