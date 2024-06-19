import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAo4Hnd2Dm_E8Kq6KuPCcueHrPKQSHSL6Q",
  authDomain: "abs-menu.firebaseapp.com",
  projectId: "abs-menu",
  storageBucket: "abs-menu.appspot.com",
  messagingSenderId: "540409372212",
  appId: "1:540409372212:web:536c096e9ca9b1f68ff461",
};

export default initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
