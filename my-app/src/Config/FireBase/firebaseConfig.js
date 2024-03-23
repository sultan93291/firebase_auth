// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";



const firebaseConfig = {
  apiKey: process.env.API_KEY || "AIzaSyASu4pSD9VSo3nvTu4JujDMAG77dRh-CxI",
  authDomain: process.env.AUTH_DOMAIN || "wechat-121c8.firebaseapp.com",
  projectId: process.env.PROJECT_ID || "wechat-121c8",
  storageBucket: process.env.STORAGE_BUCKET || "wechat-121c8.appspot.com",
  messagingSenderId: process.env.MSG_SENDER_ID || "63250234955",
  appId: process.env.APP_ID || "1:63250234955:web:1358523a08c1eb6fb017ce",
  measurementId: process.env.MEASUREMENT_ID || "G-7GS27TJBZ6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig;
