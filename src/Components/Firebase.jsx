import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// the config for firebase
const firebaseConfig = {
  apiKey: "AIzaSyAcktiLluLtw0E8s7UlFO1DD5Me5_A7mpY",
  authDomain: "whatsappclone-7c66c.firebaseapp.com",
  projectId: "whatsappclone-7c66c",
  storageBucket: "whatsappclone-7c66c.appspot.com",
  messagingSenderId: "128349010577",
  appId: "1:128349010577:web:964ee277fb5c60db06dd30",
  measurementId: "G-GR1LQ2L57S",
};

// initialises firebase
const app = initializeApp(firebaseConfig);
// initialise the firestore database
const db = getFirestore(app);
// authentication
const auth = getAuth(app);
// google authentication
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
