import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAf9LR1CmovzP9t2ckBrh3z4rrLDRt2DM4",
  authDomain: "nate-flix.firebaseapp.com",
  projectId: "nate-flix",
  storageBucket: "nate-flix.firebasestorage.app",
  messagingSenderId: "262856251452",
  appId: "1:262856251452:web:86872b883c4ee6b8410b39",
  measurementId: "G-GM726783YH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

//For the databasee
export const db= getFirestore(app);