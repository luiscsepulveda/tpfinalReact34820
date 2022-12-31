
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyBg7O9npEaZv9plEVmbbH3gm10dqnT1bGk",
  authDomain: "ecommerce-stand.firebaseapp.com",
  projectId: "ecommerce-stand",
  storageBucket: "ecommerce-stand.appspot.com", 
  messagingSenderId: "397415073686",
  appId: "1:397415073686:web:93be56c88c0bef896b3fb7"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app) 