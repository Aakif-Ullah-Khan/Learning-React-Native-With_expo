// app/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase web config (same as yours)
const firebaseConfig = {
  apiKey: "AIzaSyCr3NDJNT1h68CopZX5Adv0sxphXsgYIxc",
  authDomain: "zindrop-df1f8.firebaseapp.com",
  projectId: "zindrop-df1f8",
  storageBucket: "zindrop-df1f8.firebasestorage.app",
  messagingSenderId: "391852848697",
  appId: "1:391852848697:web:116d33dd23fedc897d7fe8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth (web SDK)
export const auth = getAuth(app);

// for storing the user data in registration time 
export const db = getFirestore(app);