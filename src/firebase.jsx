// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import {db} from 'firebase'
// import firebase from 'firebase/app';
// import 'firebase/auth';



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBku_NuNEGzaupFSa_hrg8KBUtf1mvfqv8",
    authDomain: "admin-panel-df210.firebaseapp.com",
    projectId: "admin-panel-df210",
    storageBucket: "admin-panel-df210.appspot.com",
    messagingSenderId: "894553722766",
    appId: "1:894553722766:web:48dec612dcb76368da1edf",
    measurementId: "G-0BSSDLNKE3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

