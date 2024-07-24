import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyC96Kuu_46b3y063Y4koH0_FLxqyc6QsPA",
  authDomain: "naturesdeck-imagedb.firebaseapp.com",
  projectId: "naturesdeck-imagedb",
  storageBucket: "naturesdeck-imagedb.appspot.com",
  messagingSenderId: "435674529819",
  appId: "1:435674529819:web:20a1e55a4b33b338c038be",
  measurementId: "G-ZPSMN8KQTY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);