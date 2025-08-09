import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlEGCcl1LQ_GY_xntDg054e08Z_xsQw58",
  authDomain: "my-portfolio-37cef.firebaseapp.com",
  projectId: "my-portfolio-37cef",
  storageBucket: "my-portfolio-37cef.appspot.com",
  messagingSenderId: "551766919539",
  appId: "1:551766919539:web:786e9e6d49282c29275d06"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);