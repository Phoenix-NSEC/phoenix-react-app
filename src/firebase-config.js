import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDaG2veIyxIjHAnK-ykPMwGcWBx6oYTcoI",
  authDomain: "phoenix-demo-dc32a.firebaseapp.com",
  projectId: "phoenix-demo-dc32a",
  storageBucket: "phoenix-demo-dc32a.firebasestorage.app",
  messagingSenderId: "225215329935",
  appId: "1:225215329935:web:c76b65a93e246600df62fa",
  measurementId: "G-F7SSR38QBE"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);