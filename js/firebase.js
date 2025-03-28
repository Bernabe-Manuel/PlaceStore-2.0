
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyD8Uz_SWAYZcdvp8v4NdQHjbEZ9A1IHUbY",
  authDomain: "exemplo-59af2.firebaseapp.com",
  projectId: "exemplo-59af2",
  storageBucket: "exemplo-59af2.firebasestorage.app",
  messagingSenderId: "493781488612",
  appId: "1:493781488612:web:7efe9fd9ce8125aaa5adf1",
  measurementId: "G-QT7C998J3H"
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);

