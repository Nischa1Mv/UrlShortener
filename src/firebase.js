import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: process.env.NOTAPI_KEY,
  authDomain: "urlshorterner-1ee5b.firebaseapp.com",
  projectId: "urlshorterner-1ee5b",
  storageBucket: "urlshorterner-1ee5b.appspot.com",
  messagingSenderId: "176755879312",
  appId: "1:176755879312:web:6f2ca74920054f68569715"
};

export const FBApp = initializeApp(firebaseConfig);
