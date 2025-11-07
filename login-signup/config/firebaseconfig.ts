// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCr3NDJNT1h68CopZX5Adv0sxphXsgYIxc",
  authDomain: "zindrop-df1f8.firebaseapp.com",
  projectId: "zindrop-df1f8",
  storageBucket: "zindrop-df1f8.firebasestorage.app",
  messagingSenderId: "391852848697",
  appId: "1:391852848697:web:116d33dd23fedc897d7fe8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, auth, db };

