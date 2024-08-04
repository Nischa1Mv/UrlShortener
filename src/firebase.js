import { initializeApp } from "firebase/app";
import "dotenv/config";

const firebaseConfig = {
  apiKey: process.env.NOTAPI_KEY,
  authDomain: "urlshortener-9194a.firebaseapp.com",
  projectId: "urlshortener-9194a",
  storageBucket: "urlshortener-9194a.appspot.com",
  messagingSenderId: "887232768236",
  appId: "1:887232768236:web:3ef236f995ed8b2be21dc9",
};

export const FBApp = initializeApp(firebaseConfig);
