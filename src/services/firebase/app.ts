// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRd0og7I-IeFiVgdsCNxL8prJL8XLWCNA",
  authDomain: "jhonpellegrini-management.firebaseapp.com",
  projectId: "jhonpellegrini-management",
  storageBucket: "jhonpellegrini-management.appspot.com",
  messagingSenderId: "674856934245",
  appId: "1:674856934245:web:1b822be2e9844519379f8c",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
