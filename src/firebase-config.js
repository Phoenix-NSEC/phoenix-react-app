import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBw4mgLgM6im3_xsLe7DTa9P7ONm9GjnjU",
  authDomain: "phoenix-c88b9.firebaseapp.com",
  projectId: "phoenix-c88b9",
  storageBucket: "phoenix-c88b9.appspot.com",
  messagingSenderId: "974004018957",
  appId: "1:974004018957:web:3dc10a68c0cb02d93b5a44",
  measurementId: "G-BJJC5VLRSV"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);